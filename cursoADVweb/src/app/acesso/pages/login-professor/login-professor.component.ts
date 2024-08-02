import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrl: './login-professor.component.scss'
})
export class LoginProfessorComponent {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;

  isMobile = Util.isMobile();
  formularioLogin: FormGroup;

  visivel: boolean = false;
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private usuarioService: UsuarioService,
    public router: Router,
    private cookie : CookieService,
    private _snackBar: MatSnackBar,
    // public dialog: MatDialog
  ){
    this.formularioLogin = this.fb.group({
      Email: [""],
      Senha: [""],
    });
  }

  ngOnInit(){
    var usuario = this.service.getUser();
    //console.log(usuario)
    if(usuario.email != undefined)
      this.router.navigate(['areaAluno']);

  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
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
res.obj.tipo = 'PROFESSOR'

          if(res.obj.tipo == 'PROFESSOR'){
            this.cookie.set('email', res.obj.email);
            this.cookie.set('nome', res.obj.nome);

            SnackBarComponent.prototype.texto = `Bem vindo professor, ${res.obj.nome}`;
            SnackBarComponent.prototype.tipo = 'success';
            this.openSnackBar('success');

            this.router.navigate(['areaProfessor']);
          } else {
            SnackBarComponent.prototype.texto = `ATENÇÃO! ESSA AREA É RESERVADA PARA OS PROFESSORES`;
            SnackBarComponent.prototype.tipo = 'warning';
            this.openSnackBar('warning');
          }

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
