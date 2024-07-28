import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { Arquivo } from '../../../shared/class/Arquivo.class';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../environments';
import { CookieService } from 'ngx-cookie-service';

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
  carregando: boolean = false;

  imagensACarregar?: Array<Arquivo>;
  errorMessage: any = ['Nome', 'Email', 'ConfirmaEmail', 'Telefone', 'Senha', 'CpfCnpj', 'Cep', 'Rua', 'Numero' ];

  Nome = false;
  Email = true;
  Telefone = true;
  Senha = true;
  CpfCnpj = true;
  Cargo = true;
  Cep = true;
  Complemento = true;
  Rua = true;
  Numero = true;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private service: AuthService,
    private cookie : CookieService,
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
      Cargo: [""],
      Cep: [""],
      Rua: [""],
      Complemento: [""],
      Numero: [""],
    });
  }

  ngOnInit(){
    this.errorMessage['Nome'] = 'Digite o nome'
    this.errorMessage['Email'] = 'Digite o e-mail'
    this.errorMessage['ConfirmaEmail'] = 'Confirme o email'
    this.errorMessage['CpfCnpj'] = 'Cpf/Cnpj deve ser preenchido'
    this.errorMessage['Telefone'] = 'Digite o telefone'
    this.errorMessage['Senha'] = 'Digite a senha'
    this.errorMessage['Cep'] = 'Digite seu cep'
    this.errorMessage['Complemento'] = 'Digite seu complemento'
    this.errorMessage['Rua'] = 'Digite o nome da rua do endereço'
    this.errorMessage['Numero'] = 'Digite o número do endereço'
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


  pegarValidaEmail(){
    var pegaValidacaoEscrita = get()
    var emailSaoIguais = false;

    if(this.formularioCadastro.controls['Email'].value == ''){
      this.Email = false;
      this.errorMessage['Email'] = 'Digite o e-mail';
      SnackBarComponent.prototype.texto = "Digite o e-mail";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
    } else{
      if(!pegaValidacaoEscrita){
        this.errorMessage['Email'] = 'Email invalido';
        SnackBarComponent.prototype.texto = "Email invalido";
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('warning');
      } else {
        if(this.formularioCadastro.controls['Email'].value != this.formularioCadastro.controls['ConfirmaEmail'].value){
          emailSaoIguais = false;
          this.errorMessage['Email'] = 'Emails devem ser iguais';
          SnackBarComponent.prototype.texto = "Emails devem ser iguais";
          SnackBarComponent.prototype.tipo = 'warning';
          this.openSnackBar('warning');
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
      this.openSnackBar('warning');
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
      this.openSnackBar('warning');
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

          // if(tipo == 'Cargo')
          //   this.Cargo = false;

        } else{
          if(tipo == 'Nome')
            this.Nome = true;

          // if(tipo == 'Cargo')
          //   this.Cargo = true;

          if(tipo == 'Senha'){
            if(this.formularioCadastro.controls['Senha'].value != this.formularioCadastro.controls['ConfirmaSenha'].value){
              this.errorMessage['Senha'] = 'Senhas devem ser iguais';
              SnackBarComponent.prototype.texto = "Senhas devem ser iguais";
              SnackBarComponent.prototype.tipo = 'warning';
              this.openSnackBar('warning');

              this.Senha = false;
            } else{
              this.Senha = true;
            }
          }
        }
    }

  }
  cadastrar(){
    this.carregando = true;
    var form = this.formularioCadastro.value
    form.CpfCnpj = this.formularioCadastro.value.CpfCnpj.replace(/[^0-9]/g, '')
    form.Telefone = this.formularioCadastro.value.Telefone.replace(/[^0-9]/g, '')
    // console.log(form)

    if(this.formularioCadastro.controls['CpfCnpj'].value == ''){
      this.carregando = false;

      this.errorMessage['CpfCnpj'] = 'Cpf/Cnpj deve ser preenchido';
      SnackBarComponent.prototype.texto = "Cpf/Cnpj deve ser preenchido";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.CpfCnpj = false;
    } else {
      this.CpfCnpj = true;
    }

    if(this.formularioCadastro.controls['Telefone'].value == ''){
      this.carregando = false;

      this.errorMessage['Telefone'] = 'Digite o telefone';
      SnackBarComponent.prototype.texto = "Digite o telefone";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.Telefone = false;
    } else {
      this.Telefone = true;
    }

    if(this.formularioCadastro.controls['Complemento'].value == ''){
      this.carregando = false;

      this.errorMessage['Complemento'] = 'Digite seu complemento';
      SnackBarComponent.prototype.texto = "Digite seu complemento";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.Complemento = false;
    } else {
      this.Complemento = true;
    }

    if(this.formularioCadastro.controls['Cep'].value == ''){
      this.carregando = false;

      this.errorMessage['Cep'] = 'Digite seu cep';
      SnackBarComponent.prototype.texto = "Digite seu cep";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.Cep = false;
    } else {
      this.Cep = true;
    }

    if(this.formularioCadastro.controls['Rua'].value == ''){
      this.carregando = false;

      this.errorMessage['Rua'] = 'Digite o nome da rua do endereço';
      SnackBarComponent.prototype.texto = "Digite o nome da rua do endereço";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.Rua = false;
    } else {
      this.Rua = true;
    }

    if(this.formularioCadastro.controls['Numero'].value == ''){
      this.carregando = false;

      this.errorMessage['Numero'] = 'Digite o número do endereço';
      SnackBarComponent.prototype.texto = "Digite o número do endereço";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.Numero = false;
    } else {
      this.Numero = true;
    }

    // if(this.imagemSelecionada == null){
    //   this.carregando = false;
    //   SnackBarComponent.prototype.texto = "Digite o Adicione uma foto sua";
    //   SnackBarComponent.prototype.tipo = 'warning';
    //   this.openSnackBar('warning');
    // }

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

    if(this.Nome && this.Email && this.Cep && this.Complemento && this.Rua && this.Numero &&
       this.Telefone && this.Senha && this.CpfCnpj){

        var obj = {
          Nome: form.Nome,
          Email: form.Email,
          Telefone: form.Telefone,
          Senha: form.Senha,
          CpfCnpj: form.CpfCnpj,
          Endereco: {
            Cep: form.Cep,
            Rua: form.Rua,
            Numero: form.Numero,
            Complemento: form.Complemento
          }
        }

       this.usuarioService.cadastrar(obj).subscribe({
          next: (res)=>{
            this.carregando = false;

            this.login();
          },
          error: (err)=>{
            console.log({err: err})
            this.carregando = false;

            if(err.error.text == "Usuario já foi cadastrado"){
              SnackBarComponent.prototype.texto = err.error.text;
              SnackBarComponent.prototype.tipo = 'warning';
              this.openSnackBar('warning');

              this.router.navigate(['acesso/login']);

            } else {
              SnackBarComponent.prototype.texto = err.error.text;
              SnackBarComponent.prototype.tipo = 'success';
              this.openSnackBar('success');
              this.login();

            }
          }
        })
        // console.log(item)
    }
  }

  login(){
    this.carregando = true;
    var obj = {
      "email": this.formularioCadastro.controls['Email'].value,
      "senha": this.formularioCadastro.controls['Senha'].value,
      "accessKey": "202dacd275cec7cd77cbd1923e16b5d0",
      "ip": "333"
    }

    this.service.autenticar(obj).subscribe({
      next: (res)=>{
        this.carregando = false;
        if(res.message == "Falha ao autenticar"){
          SnackBarComponent.prototype.texto = "Login ou senha incorreto";
          SnackBarComponent.prototype.tipo = 'warning';
          this.openSnackBar('warning');
        }

        if (res && res.authenticated) {
          res.obj.dataAcesso = res.created;
          res.obj.dataLimite = res.expiration;
          res.obj.admin = false;

          this.service.setCliente(res.obj);
          this.service.setToken(res.accessToken);

          this.cookie.delete('email');
          this.cookie.delete('nome');
          this.cookie.set('email', res.obj.email);
          this.cookie.set('nome', res.obj.nome);

          SnackBarComponent.prototype.texto = `Bem vindo, ${res.obj.nome}`;
          SnackBarComponent.prototype.tipo = 'success';
          this.openSnackBar('success');

          this.router.navigate(['areaAluno']);

        }
      }, error: (err)=>{
        this.carregando = false;
        console.log('err: ',err);
        SnackBarComponent.prototype.texto = "Login ou senha incorreto";
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('warning');
      }
    })
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
