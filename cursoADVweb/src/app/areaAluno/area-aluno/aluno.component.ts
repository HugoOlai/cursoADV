import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../shared/class/Usuario.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.scss'
})
export class AlunoComponent {
  usuario?: Usuario;

  constructor(
    private service: AuthService,
    public router: Router,

  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();
    console.log(this.usuario)
  }
}
