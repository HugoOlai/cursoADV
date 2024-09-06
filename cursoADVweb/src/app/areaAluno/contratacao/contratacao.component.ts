import * as _moment from 'moment';
import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { Curso } from './../../shared/class/Curso.class';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { CursosService } from '../../services/cursos.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Usuario } from '../../shared/class/Usuario.class';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

const moment = _rollupMoment || _moment;

var emailValido = false
function set(valor: boolean){
  emailValido = valor
  // console.log('set', emailValido)
}

function getIp(callback: any)
{
    function response(s: any)
    {
        callback(window.userip);

        s.onload = s.onerror = null;
        document.body.removeChild(s);
    }

    function trigger()
    {
        window.userip = false;

        var s = document.createElement("script");
        s.async = true;
        s.onload = function() {
            response(s);
        };
        s.onerror = function() {
            response(s);
        };

        s.src = "https://l2.io/ip.js?var=userip";
        document.body.appendChild(s);
    }

    if (/^(interactive|complete)$/i.test(document.readyState)) {
        trigger();
    } else {
        document.addEventListener('DOMContentLoaded', trigger);
    }
}

@Component({
  selector: 'app-contratacao',
  templateUrl: './contratacao.component.html',
  styleUrl: './contratacao.component.scss'
})
export class ContratacaoComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  isMobile = Util.isMobile();
  formularioCadastro: FormGroup;
  parcelas = ""
  valorFormatado = ""
  valorComDesconto = ""
  carregando = true;
  curso: Partial<Curso> = {};
  tipoPagamento = 1;
  listaParcelas: Array<any> = [];
  listaTipoAluno: Array<any> = [];
  desabilitar: boolean = false;
  usuario: Usuario;
  tipoAluno: any = "0";
  imagensACarregar: any;
  imagemSelecionada: any;
  nomeArquivo: string = "";

  date = new FormControl(moment());

  constructor(
    private activedRoute: ActivatedRoute,
    private service: AuthService,
    private cookie: CookieService,
    public router: Router,
    private fb: FormBuilder,
    private cursosService: CursosService,
    private _snackBar: MatSnackBar

  ) {
    this.usuario = this.service.getUser();
    this.formularioCadastro = this.fb.group({})
    this.listaTipoAluno = [{index: 0, descricao: 'SOU INSCRITO NA LISTA AMPLA'}, {index: 1, descricao: 'SOU INSCRITO PELO SISTEMA DE COTAS'}]
  }
  ngOnInit() {

    if(this.usuario != null){
      this.desabilitar = true;
      this.formularioCadastro = this.fb.group({
        Nome: {value: this.usuario.nome, disabled: true},
        Email: {value: this.usuario.email, disabled: true},
        ConfirmaEmail: [this.usuario.email],
        Telefone: {value: Util.formataTelefone(this.usuario.telefone).telefone, disabled: true},
        Senha: [""],
        CpfCnpj:{value: Util.formataCpfCpjs(this.usuario.cpfCnpj).cpfCnpj, disabled: true},
        ConfirmaSenha: [""],
        NumeroCartao: [""],
        Cupom:[""],
        ValorCurso: [""],
        NomeTitular: [""],
        // Cep: [ {value: this.usuario.endereco.cep, disabled: true}],
        // Rua: [{value: this.usuario.endereco.rua, disabled: true}],
        // Numero: [{value: this.usuario.endereco.numero, disabled: true}],
        Mes: [""],
        Ano: [""],
        ccv: [""],
        NumeroParcelas: [1],
        tipoAluno: [0],
        NumeroFinal: [""],
        Bandeira: [""]
      });
    } else {
      this.desabilitar = false;
      this.formularioCadastro = this.fb.group({
        Nome: [""],
        Email: [""],
        ConfirmaEmail: [""],
        Telefone: [""],
        Cupom:[""],
        Senha: [""],
        CpfCnpj:[""],
        ConfirmaSenha: [""],
        NumeroCartao: [""],
        ValorCurso: [""],
        NomeTitular: [""],
        // Cep: [""],
        // Rua: [""],
        // Numero: [""],
        Mes: [""],
        Ano: [""],
        ccv: [""],
        tipoAluno: [""],
        NumeroParcelas: [""],
        NumeroFinal: [""],
        Bandeira: [""]
      });
    }

    this.activedRoute.params.subscribe((params: any) => {
      try {
        this.curso.id = params['id'];

        if (this.curso.id != undefined) {
          this.cursosService.pegar(this.curso).subscribe({
            next: (curso: Curso) =>{
              this.carregando = false;
              this.curso = curso;

              this.formularioCadastro.get("ValorCurso")?.setValue(this.curso.valor);

              if(this.curso.valor){
                var divisao = this.curso.valor/12;
                this.parcelas = `12x de ${Util.formataValor(divisao)}`
                this.valorFormatado = Util.formataValor(this.curso.valor) ;
                this.valorComDesconto = Util.formataValor(this.curso.valor - 200)
              }

              for (let index = 1; index <= 12; index++) {
                if(this.curso.valor)
                  this.listaParcelas.push({index: index, descricao:`${index}x de ${Util.formataValor(this.curso.valor/index)}`});

              }
            },
            error: (err:any)=> {
              this.carregando = false;

              SnackBarComponent.prototype.texto = "Erro ao pegar o curso";
              SnackBarComponent.prototype.tipo = 'warning';
              this.openSnackBar('warning');
            }
          });
        }

      } catch (error) {
        console.log(error)
      }
    });
  }

  validaCupon(){
    var form = this.formularioCadastro.value
    if(form.Cupom == this.curso.cupom){

      if(this.curso.valor && this.curso.valorCupom){
        this.curso.valor = this.curso.valor - this.curso.valorCupom;
        this.formularioCadastro.get("ValorCurso")?.setValue(this.curso.valor);
        if(this.curso.valor){
          var divisao = this.curso.valor/12;
          this.parcelas = `12x de ${Util.formataValor(divisao)}`
          this.valorFormatado = Util.formataValor(this.curso.valor) ;
          this.valorComDesconto = Util.formataValor(this.curso.valor - 200)
        }

        this.listaParcelas = [];
        for (let index = 1; index <= 12; index++) {
          if(this.curso.valor)
            this.listaParcelas.push({index: index, descricao:`${index}x de ${Util.formataValor(this.curso.valor/index)}`});

        }
      }


    }
  }
  changeClient(item: any){


  }

  upload(event: any) {
    const keys = Object.keys(event.target.files);
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    this.nomeArquivo = event.target.files[0].name;

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
    this.imagemSelecionada = null;
    this.nomeArquivo = "";
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.formularioCadastro.controls['Ano'].setValue(ctrlValue.toDate().getFullYear())
    this.formularioCadastro.controls['Mes'].setValue(ctrlValue.toDate().getMonth() +1)

    datepicker.close();
  }


  formataTelefone(){
    var telefone: string = this.formularioCadastro.controls['Telefone'].value;
    var obj = Util.formataTelefone(telefone);

    if(!obj.validaTelefone){
      SnackBarComponent.prototype.texto = "Telefone invalido";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
    }

    this.formularioCadastro.controls['Telefone'].setValue(obj.telefone)
  }

  formataCpfCpjs(){
    var cpfCnpj: string = this.formularioCadastro.controls['CpfCnpj'].value;
    var obj = Util.formataCpfCpjs(cpfCnpj);

    if(!obj.validaCPF){
      SnackBarComponent.prototype.texto = "CPF ou CNPJ incorreto";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
    }
    this.formularioCadastro.controls['CpfCnpj'].setValue(obj.cpfCnpj)

  }

  formatarCartao(){
    var numeroCartao: string = this.formularioCadastro.controls['numeroCartao'].value;
    var obj = Util.formatarCartao(numeroCartao)
    if(!obj.validaNumeroCartao){
      SnackBarComponent.prototype.texto = "Número do cartão incorreto";
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
    }
    this.formularioCadastro.controls['numeroCartao'].setValue(obj.numeroCartao)
  }

  verificarCamposObrigatorios(form: any): boolean {
    var result = true;

    var camposObrigatorios = [
      { campo: form.Nome.value, mensagem: "Informe seu nome completo" },
      { campo: form.Email.value, mensagem: "Informe um e-mail válido" },
      { campo: form.NumeroParcelas.value, mensagem: "Valor da parcela deve ser definido" },
      //{ campo: form.Cpf, mensagem: "Informe um cpf ou cnpj válido" },
      { campo: form.Telefone.value, mensagem: "Informe um telefone" },
      // { campo: form.Cep.value, mensagem: "Informe seu cep" },
      // { campo: form.Rua.value, mensagem: "Informe uma rua" },
      // { campo: form.Numero.value, mensagem: "Informe um número" },
      { campo: this.tipoPagamento, mensagem: "Selecione um tipo de pagamento" },
      //{ campo: form.Validade, mensagem: "Informe a validade do cartão" },

    ]

    if(this.tipoAluno != '0' && this.imagemSelecionada == null){
      camposObrigatorios.push({ campo: null, mensagem: "Adicione um comprovante" })

    }

    if(this.tipoPagamento == 1){
      camposObrigatorios.push({ campo: form.NumeroCartao.value, mensagem: "Informe um numero do cartão" })
      camposObrigatorios.push({ campo: form.NomeTitular.value, mensagem: "Informe o nome do titular do cartão" })
      camposObrigatorios.push({ campo: form.ccv.value, mensagem: "Informe o ccv" })
      // camposObrigatorios.push({ campo: form.rua.value, mensagem: "Informe o ccv" })
      // camposObrigatorios.push({ campo: form.ccv.value, mensagem: "Informe o ccv" })
      // camposObrigatorios.push({ campo: form.ccv.value, mensagem: "Informe o ccv" })

    }

    if(form.email != form.confirmaEmail)
      camposObrigatorios = camposObrigatorios.concat([{ campo: '', mensagem: "Emails devem ser iguais" },])


    for (const campoInfo of camposObrigatorios) {
      if (Util.isNullOrEmpty(campoInfo.campo)) {
        SnackBarComponent.prototype.texto = "Campo Obrigatório: " + campoInfo.mensagem;
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('warning');
        result = false;
        break;
      }
    }

    return result;
  }

  validateEmail(){
    var email: string = this.formularioCadastro.controls['Email'].value;

    var obj = Util.validateEmail(email);
    this.formularioCadastro.controls['Email'].setValue(obj)


  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  contratar(){
    var form: any = this.formularioCadastro.controls
    this.carregando = true;

    if(this.verificarCamposObrigatorios(form) == true){
      var obj: any = {
          Nome: form.Nome.value,
          Email: form.Email.value,
          Telefone: form.Telefone.value,
          CpfCnpj: form.CpfCnpj.value,

          // Endereco:{
          //   Cep: form.Cep.value,
          //   Numero: form.Numero.value,
          //   Rua: form.Rua.value
          // },

          cartao:{
            NomeCartao: form.NomeTitular.value,
            NumeroCartao: form.NumeroCartao.value,
            MesExpira: form.Mes.value.toString(),
            AnoExpira: form.Ano.value.toString(),
            ccv: form.ccv.value,
            NumeroFinal: form.NumeroFinal.value,
            Bandeira: form.Bandeira.value,
          }

      }

      var ipEncontrado: any;
      getIp(async function (ip: any) {
        ipEncontrado = await ip;
      })


      setTimeout(() => {
        obj.Ip = ipEncontrado;

        if(this.tipoAluno == '0'){
          this.imagemSelecionada = null;
          this.nomeArquivo = "";
        }

        if(this.tipoPagamento == 2)
          form.NumeroParcelas.value = 1;

        if(this.curso.valor)
          obj.ValorParcelas = this.curso.valor/form.NumeroParcelas.value;


        if(this.tipoAluno == 1 && this.curso.valor)
          obj.ValorParcelas = this.curso.valor - 200;

        obj.NumeroParcelas = parseInt(form.NumeroParcelas.value);
        obj.tipoPagamento = this.tipoPagamento;
        obj.imagemSelecionada = this.imagemSelecionada;
        obj.tipoAluno = this.tipoAluno;

        if((form.Mes.value == "" || form.Ano.value == "") && this.tipoPagamento == 1){
          this.carregando = false;

          SnackBarComponent.prototype.texto = "SELECIONE MÊS E ANO CLICANDO NO ICONE DE CALENDÁRIO";
          SnackBarComponent.prototype.tipo = 'warning';
          this.openSnackBar('warning');
        } else {
          this.carregando = true;
          var curso: any = this.curso;
          curso.valor = this.curso.valor?.toString();
          this.cursosService.contratarCurso(curso, obj).subscribe({
            next: (res:any) =>{
              SnackBarComponent.prototype.texto = "Curso contratado";
              SnackBarComponent.prototype.tipo = 'success';
              this.openSnackBar('success');
              this.router.navigate(['areaAluno/inicio']);
              this.carregando = false;

            },
            error: (err:any)=> {
              console.log(err)
              this.carregando = false;

              if(err.status == 200){
                SnackBarComponent.prototype.texto = this.tipoPagamento == 1? "Curso contratado": "Estamos aguardando a confirmação do pagamento";
                SnackBarComponent.prototype.tipo = 'success';
                this.openSnackBar('success');
                this.router.navigate(['areaAluno/inicio']);

              } else {
                if(err.status == 500){
                  SnackBarComponent.prototype.texto = err.error +", VERIFIQUE OS DADOS DO SEU CARTÃO";
                  SnackBarComponent.prototype.tipo = 'warning';
                  this.openSnackBar('warning');

                } else if(err.status == 400) {
                  var erro = "Transação não autorizada, verifique o limite disponível no cartão."
                  SnackBarComponent.prototype.texto = erro.toLocaleUpperCase();
                  SnackBarComponent.prototype.tipo = 'warning';
                  this.openSnackBar('warning');

                  // if(err.status == 200)
                  //   this.router.navigate(['areaAluno/inicio']);

                  // this.cookie.delete('nome');
                  // this.cookie.delete('email');
                  // this.service.clearUser();
                  // SnackBarComponent.prototype.texto = "conectar com a sua conta";
                  // SnackBarComponent.prototype.tipo = 'warning';
                  // this.openSnackBar('warning');
                  // this.router.navigate(['acesso/login']);

                }
              }


            }
          })
        }


      }, 3000);


    } else{
      this.carregando = false;

    }
  }

}
