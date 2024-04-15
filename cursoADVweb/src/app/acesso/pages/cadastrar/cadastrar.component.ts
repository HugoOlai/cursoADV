import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent {
  isMobile = Util.isMobile();
  formularioCadastro: FormGroup;
  visivel: boolean = false;


  constructor(
    private fb: FormBuilder,
    // private service: AuthService,
    // private usuarioService: UsuarioService,
    // public router: Router


  ){

    this.formularioCadastro = this.fb.group({
      Nome: [""],
      SobreNome: [""],
      Email: [""],
      ConfirmaEmail: [""],
      Telefone: [""],
      Senha: [""],
      CpfCnpj:[""],
      SenhaConfirmada: [""],
    });
  }

  cadastrar(){

  }
}
