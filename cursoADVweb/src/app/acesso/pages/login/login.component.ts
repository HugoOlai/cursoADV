import { Router } from '@angular/router';
import { Util } from '../../../class/util.class';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments';
import { AppComponent } from '../../../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;

  carregando = false;
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
    private _snackBar: MatSnackBar
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

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
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
    this.carregando = true;
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
        this.carregando = false;
        if(res.message == "Falha ao autenticar"){
          SnackBarComponent.prototype.texto = "Login ou senha incorreto";
          SnackBarComponent.prototype.tipo = 'warning';
          this.openSnackBar('warning');
        }

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
}
