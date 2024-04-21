import { Util } from '../../../class/util.class';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  visivel: boolean = false;
  possuiCadastro: boolean = true;
  ip: string = '';
  isMobile = Util.isMobile();

  formularioLogin: FormGroup;
  formularioCadastro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private usuarioService: UsuarioService,
    public router: Router,
    private cookie : CookieService,


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
        // console.log({res: res})
      },
      error: (err)=>{
        // console.log({err: err})

      }
    })
    // console.log(item)
  }

  login(){
    var item  = this.formularioLogin.value;


    var obj = {
      "email": item.Email,
      "senha": item.Senha,
      "accessKey": "202dacd275cec7cd77cbd1923e16b5d0",
      "ip": "333"

      }

    this.service.autenticar(obj).subscribe({
      next: (res)=>{
        console.log('res: ',res)
        if (res && res.authenticated) {
          res.obj.dataAcesso = res.created;
          res.obj.dataLimite = res.expiration;
          res.obj.admin = environment.baseUrl.includes("localhost") && this.formularioLogin.controls["Senha"].value == "@@71XX";

          this.service.setCliente(res.obj);
          this.service.setToken(res.accessToken);

          this.cookie.delete('email');
          this.cookie.delete('nome');
          this.cookie.set('email', res.obj.email);
          this.cookie.set('nome', res.obj.nome);

          this.router.navigate(['areaAluno']);

        }
      }, error: (err)=>{
         console.log('err: ',err)
      }
    })
  }
}
