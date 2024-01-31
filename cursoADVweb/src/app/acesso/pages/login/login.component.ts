import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  visivel: boolean = false;
  possuiCadastro: boolean = true;
  ip: string = '';

  constructor(
    private service: AuthService,

  ){

  }

  ngOnInit(){
  }

  login(){
    var teste = {
        accessKey: '202dacd275cec7cd77cbd1923e16b5d0',
        senha: 'senha',
        email: '@teste',
        ip:'333'
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
