import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { Arquivo } from '../../../shared/class/Arquivo.class';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';

var emailValido = false
function set(valor: boolean){
  emailValido = valor
  // console.log('set', emailValido)
}

function get(){
  return emailValido;
}

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  isMobile = Util.isMobile();
  formularioCadastro: FormGroup;
  imagemSelecionada: any;
  visivel: boolean = false;
  imagensACarregar?: Array<Arquivo>;
  errorMessage: any = ['Nome', 'Email', 'ConfirmaEmail', 'Telefone', 'Senha', 'CpfCnpj', 'Cargo' ];

  Nome = false;
  Email = true;
  Telefone = true;
  Senha = true;
  CpfCnpj = true;
  Cargo = true;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar

  ){

    this.formularioCadastro = this.fb.group({
      Nome: [""],
      Email: ['', [Validators.required, this.validateEmail]],
      ConfirmaEmail: [""],
      Telefone: [""],
      Senha: [""],
      CpfCnpj:[""],
      ConfirmaSenha: [""],
      Cargo: [""]
    });
  }

  ngOnInit(){
    this.errorMessage['Nome'] = 'Digite o nome'
    this.errorMessage['Email'] = 'Digite o e-mail'
    this.errorMessage['ConfirmaEmail'] = 'Confirme o email'
    this.errorMessage['CpfCnpj'] = 'Cpf/Cnpj deve ser preenchido'
    this.errorMessage['Telefone'] = 'Digite o telefone'
    this.errorMessage['Senha'] = 'Digite a senha'
    this.errorMessage['Cargo'] = 'Digite seu cargo'
  }

  validateEmail(control: any){
    // console.log(this.formularioCadastro.controls['Email'].value)
    var emailValido = Util.validateEmail(control.value)
    if(!emailValido){
     // this.Email = false;
      // this.errorMessage['Email'] = 'Email invalido';
      return false;
    }

    set(emailValido)
    return true;

  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      //duration: 2 * 1000,
      panelClass: defineClass
    });
  }


  pegarValidaEmail(){
    var pegaValidacaoEscrita = get()
    var emailSaoIguais = false;

    if(this.formularioCadastro.controls['Email'].value == ''){
      this.Email = false;
      this.errorMessage['Email'] = 'Digite o e-mail';
      SnackBarComponent.prototype.texto = "Digite o e-mail";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('snakBar-warning');
    } else{
      if(!pegaValidacaoEscrita){
        this.errorMessage['Email'] = 'Email invalido';
        SnackBarComponent.prototype.texto = "Email invalido";
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('snakBar-warning');
      } else {
        if(this.formularioCadastro.controls['Email'].value != this.formularioCadastro.controls['ConfirmaEmail'].value){
          emailSaoIguais = false;
          this.errorMessage['Email'] = 'Emails devem ser iguais';
          SnackBarComponent.prototype.texto = "Emails devem ser iguais";
          SnackBarComponent.prototype.tipo = 'warning';
          this.openSnackBar('snakBar-warning');
        } else {
          emailSaoIguais = true;
        }
      }
    }

    this.Email = pegaValidacaoEscrita && emailSaoIguais ? true : false;
  }

  formataCpfCpjs(){
    console.log(this.formularioCadastro.controls['CpfCnpj'].value)
    let regex = new RegExp(/(\d{3}).(\d{3}).(\d{3})-(\d{2})/);
    var validaCPF;
    var cpfCnpj: string = this.formularioCadastro.controls['CpfCnpj'].value;
    cpfCnpj = cpfCnpj.includes('.')? cpfCnpj.replace(/./g,'') : cpfCnpj;
    cpfCnpj = cpfCnpj.includes('/')? cpfCnpj.replace(/\//g,'') : cpfCnpj;
    cpfCnpj = cpfCnpj.includes('-')? cpfCnpj.replace(/-/g,'') : cpfCnpj;
    // console.log(cpfCnpj)
    // console.log(cpfCnpj.length)

    if(cpfCnpj.length < 14){
      cpfCnpj = cpfCnpj.substring(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      validaCPF = regex.test(cpfCnpj);

    } else{
      cpfCnpj = cpfCnpj.substring(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      regex = new RegExp(/(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})/);
      validaCPF = regex.test(cpfCnpj);

    }

    this.CpfCnpj = validaCPF;

    if(!validaCPF){
      this.errorMessage['CpfCnpj'] = 'CPF ou CNPJ incorreto';
      SnackBarComponent.prototype.texto = "CPF ou CNPJ incorreto";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('snakBar-warning');
    }

    this.formularioCadastro.controls['CpfCnpj'].setValue(cpfCnpj)
  }

  formataTelefone(){
    let regex = new RegExp(/\(\d{2}\)\s\d{5}-\d{4}/);
    var validaTelefone;
    var telefone: string = this.formularioCadastro.controls['Telefone'].value.trim();
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

    this.Telefone = validaTelefone;
    // console.log(telefone)
    // console.log(validaTelefone)

    if(!validaTelefone){
      this.errorMessage['Telefone'] = 'Telefone invalido';
      SnackBarComponent.prototype.texto = "Telefone invalido";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('snakBar-warning');
    }

    this.formularioCadastro.controls['Telefone'].setValue(telefone)

  }

  upload(event: any) {
    const keys = Object.keys(event.target.files);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      if(event.target != null)
        this.imagemSelecionada = event.target.result;
    }

    this.imagensACarregar = keys.map((key: any) => {
      if (key !== 'length') {
        return event.target.files[key];
      }
    });

    if(this.imagensACarregar.length > 0) {
      event.target.value = '';
      // this.imagensACarregar.forEach(file => this.formData.append('file', file, file.name));
      // this.service
      // .salvarArquivos(this.pasta.id, formData)
      // .subscribe(
      //   (res: any) => {})
    }
  }

  Limpar(){
    this.imagemSelecionada = null
  }


  confereCampos(tipo: string, mensagemErro = ''){
    switch(tipo){
      case 'Email':
        this.pegarValidaEmail();
      break;
      case 'CpfCnpj':
        this.formataCpfCpjs();
      break;
      case 'Telefone':
        this.formataTelefone();
      break;
      default:
        if(this.formularioCadastro.controls[tipo].value == ''){
          this.errorMessage[tipo] = mensagemErro;
          if(tipo == 'Nome')
            this.Nome = false;

          if(tipo == 'Senha')
            this.Senha = false;

          if(tipo == 'Cargo')
            this.Cargo = false;

        } else{
          if(tipo == 'Nome')
            this.Nome = true;

          if(tipo == 'Cargo')
            this.Cargo = true;

          if(tipo == 'Senha'){
            if(this.formularioCadastro.controls['Senha'].value != this.formularioCadastro.controls['ConfirmaSenha'].value){
              this.errorMessage['Senha'] = 'Senhas devem ser iguais';
              SnackBarComponent.prototype.texto = "Senhas devem ser iguais";
              SnackBarComponent.prototype.tipo = 'warning';
              this.openSnackBar('snakBar-warning');

              this.Senha = false;
            } else{
              this.Senha = true;
            }
          }
        }
    }

  }
  cadastrar(){
    var form = this.formularioCadastro.value
    form.CpfCnpj = this.formularioCadastro.value.CpfCnpj.replace(/[^0-9]/g, '')
    form.Telefone = this.formularioCadastro.value.Telefone.replace(/[^0-9]/g, '')
    // console.log(form)

    if(this.formularioCadastro.controls['CpfCnpj'].value == ''){
      this.errorMessage['CpfCnpj'] = 'Cpf/Cnpj deve ser preenchido';
      SnackBarComponent.prototype.texto = "Cpf/Cnpj deve ser preenchido";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('snakBar-warning');
      this.CpfCnpj = false;
    } else {
      this.CpfCnpj = true;
    }

    if(this.formularioCadastro.controls['Telefone'].value == ''){
      this.errorMessage['Telefone'] = 'Digite o telefone';
      SnackBarComponent.prototype.texto = "Digite o telefone";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('snakBar-warning');
      this.Telefone = false;
    } else {
      this.Telefone = true;
    }

    // if(this.formularioCadastro.controls['Senha'].value == ''){
    //     this.Senha = false;
    //     this.errorMessage['Senha'] = 'Digite a senha';
    // } else {
    //   if(this.formularioCadastro.controls['Senha'].value != this.formularioCadastro.controls['ConfirmaSenha'].value){
    //     this.errorMessage['Senha'] = 'Senhas devem ser iguais';
    //     this.Senha = false;
    //   } else{
    //     this.Senha = true;
    //   }
    // }

    this.pegarValidaEmail();

    form.src = this.imagemSelecionada;

    if(this.Nome && this.Email &&
       this.Telefone && this.Senha &&
       this.CpfCnpj && this.imagemSelecionada != null && this.Cargo){

        this.usuarioService.cadastrar(form).subscribe({
          next: (res)=>{
            this.limpar;
          },
          error: (err)=>{
            console.log({err: err.error.text})
            // alert(err.error.text);

            if(err.error.text == "Usuario já foi cadastrado"){
              SnackBarComponent.prototype.texto = err.error.text;
              SnackBarComponent.prototype.tipo = 'warning';
              this.openSnackBar('snakBar-warning');

              this.router.navigate(['acesso/login']);

            } else {
              SnackBarComponent.prototype.texto = err.error.text;
              SnackBarComponent.prototype.tipo = 'success';
              this.openSnackBar('snakBar-success');

              this.router.navigate(['acesso/login']);

            }
          }
        })
        // console.log(item)
    }
  }

  limpar(){
    this.formularioCadastro.controls['Nome'].setValue('');
    this.formularioCadastro.controls['Email'].setValue('');
    this.formularioCadastro.controls['Telefone'].setValue('');
    this.formularioCadastro.controls['Mensagem'].setValue('');
    this.formularioCadastro.controls['ConfirmaEmail'].setValue('');

    this.Nome = false;
    this.Email = true;
    this.Telefone = true;
    this.Senha = true;
    this.CpfCnpj = true;
    this.imagemSelecionada = null;
  }

  voltar(){
    this.router.navigate(['acesso/login'])

  }
}
