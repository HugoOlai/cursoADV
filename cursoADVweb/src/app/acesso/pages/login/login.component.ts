import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  visivel: boolean = false;
  possuiCadastro: boolean = true;
  ip: string = '';

  formularioLogin: FormGroup;
  formularioCadastro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private usuarioService: UsuarioService

  ){
    this.formularioLogin = this.fb.group({
      Email: [""],
      Senha: [""],
    });

    this.formularioCadastro = this.fb.group({
      Nome: [""],
      SobreNome: [""],
      Email: [""],
      Telefone: [""],
      Senha: [""],
      SenhaConfirmada: [""],
    });
  }

  ngOnInit(){


  }

  cadastrar(){
    var item  = this.formularioCadastro.value;
    this.usuarioService.cadastrar(item).subscribe({
      next: (res)=>{
        console.log({res: res})
      },
      error: (err)=>{
        console.log({err: err})

      }
    })
    console.log(item)
  }

  login(){
    var teste = {
      "email": "@teste",
      "senha": "324523",
      "accessKey": "202dacd275cec7cd77cbd1923e16b5d0",
      "ip": "333"

      }

      console.log('logar')
    this.service.autenticar(teste).subscribe({
      next: (res)=>{
        console.log(res)

      }, error: (err)=>{
        console.log(err)
      }
    })
  }
}
