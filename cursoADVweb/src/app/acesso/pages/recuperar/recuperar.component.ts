import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Validators } from 'ngx-editor';
import { Util } from '../../../class/util.class';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

var emailValido = false
function set(valor: boolean){
  emailValido = valor
  // console.log('set', emailValido)
}

function get(){
  return emailValido;
}

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.scss'
})
export class RecuperarComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  visivel = false;
  visivel2 = false;
  carregando = false;

  formularioRecuperaSenha: FormGroup;
  isMobile = Util.isMobile();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: AuthService,
    public dialogRef: MatDialogRef<RecuperarComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private usuarioService: UsuarioService,
    // public router: Router,
    // private cookie : CookieService,
    // private _snackBar: MatSnackBar,
    // public dialog: MatDialog
  ){
    this.formularioRecuperaSenha = this.fb.group({
      Email: ['', [Validators.required, this.validateEmail]],
      Telefone: [""],
      NovaSenha: [""],
      ConfirmarSenha:[""]
    });
  }

  validateEmail(control: any){
    var emailValido = Util.validateEmail(control.value)
    if(!emailValido){
      return false;
    }

    set(emailValido)
    return true;

  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  trocarSenha(){
    // console.log(this.formularioRecuperaSenha.value)
    var validaInformações = true;
    if(this.formularioRecuperaSenha.controls['Email'].value == ''){
      SnackBarComponent.prototype.texto = "Digite o email";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      validaInformações = false;
    }

    if(this.formularioRecuperaSenha.controls['Telefone'].value == ''){
      SnackBarComponent.prototype.texto = "Digite o telefone";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      validaInformações = false;
    } else {
      this.formularioRecuperaSenha.value.Telefone  = this.formularioRecuperaSenha.value.Telefone.replace('(','').replace(')', '').replace(' ','').replace('-','')
    }

    if(this.formularioRecuperaSenha.controls['NovaSenha'].value == ""){
      SnackBarComponent.prototype.texto = "Senha não pode estar vazia";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      validaInformações = false;

    }

    if(this.formularioRecuperaSenha.controls['NovaSenha'].value != this.formularioRecuperaSenha.controls['ConfirmarSenha'].value){
      SnackBarComponent.prototype.texto = "Senhas devem ser iguais";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      validaInformações = false;

    }

    if(validaInformações)
    {
      this.carregando = true;
      this.service.recuperarSenha(this.formularioRecuperaSenha.value).subscribe({
        next: (res)=>{
          this.carregando = false;

        },
        error: (err)=>{
          this.carregando = false;

          // console.log({err: err})

          if(err.error.text == "Senha atualizada com sucesso"){
            SnackBarComponent.prototype.texto = err.error.text.toUpperCase();
            SnackBarComponent.prototype.tipo = 'success';
            this.openSnackBar('success');
            this.dialogRef.close();

          } else {
            SnackBarComponent.prototype.texto = err.error.text.toUpperCase();
            SnackBarComponent.prototype.tipo = 'warning';
            this.openSnackBar('warning');

          }
        }
      });
    }
  }

  fechar(){
    this.dialogRef.close();
  }

  confereCampos(tipo: string, mensagemErro = ''){
    switch(tipo){
      case 'Email':
        this.pegarValidaEmail();
      break;
      case 'Telefone':
        this.formataTelefone();
      break;

    }

  }

  formataTelefone(){
    let regex = new RegExp(/\(\d{2}\)\s\d{5}-\d{4}/);
    var validaTelefone;
    var telefone: string = this.formularioRecuperaSenha.controls['Telefone'].value.trim();
    // console.log('TEM: ',telefone.includes('('))
    telefone = telefone.includes('(')? telefone.replace('(','') : telefone;
    telefone = telefone.includes(')')? telefone.replace(')','') : telefone;
    telefone = telefone.includes('-')? telefone.replace('-','') : telefone;
    telefone = telefone.includes('+')? telefone.replace('+','') : telefone;
    var teste = telefone.split(' ');
    telefone = teste.join('')
    // console.log(telefone)
    // console.log(telefone.length)

    if(telefone.length < 13){
      telefone = telefone.substring(0, 11).replace(/(\d{2})(\d)/,"($1) $2");
      telefone = telefone.replace(/(\d)(\d{4})$/,"$1-$2");
      validaTelefone = regex.test(telefone);

    } else {
      telefone = telefone.substring(0, 15).replace(/(\d{2})(\d{2})(\d)/, '+$1 ($2) ');
      telefone = telefone.replace(/(\d)(\d{4})$/,"$1-$2");
      regex = new RegExp(/\+\d{2}\s\(\d{2}\)\s\d{5,5}-?\d{4}/)
      validaTelefone = regex.test(telefone);
    }

    //this.Telefone = validaTelefone;
    // console.log(telefone)
    // console.log(validaTelefone)

    if(!validaTelefone){
      //this.errorMessage['Telefone'] = 'Telefone invalido';
      SnackBarComponent.prototype.texto = "Telefone invalido";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      return false;
    }

    this.formularioRecuperaSenha.controls['Telefone'].setValue(telefone)
    return true;
  }

  pegarValidaEmail(){
    var pegaValidacaoEscrita = get()

    if(this.formularioRecuperaSenha.controls['Email'].value == ''){
      // this.Email = false;
      // this.errorMessage['Email'] = 'Digite o e-mail';
      SnackBarComponent.prototype.texto = "Digite o e-mail";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      return false;

    } else{
      if(!pegaValidacaoEscrita){
        // this.errorMessage['Email'] = 'Email invalido';
        SnackBarComponent.prototype.texto = "Email invalido";
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('warning');
        return false;
      }

        return true;
      }


  }
}
