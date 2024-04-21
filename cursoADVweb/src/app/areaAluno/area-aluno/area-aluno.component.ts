import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../shared/class/Usuario.class';

@Component({
  selector: 'app-area-aluno',
  templateUrl: './area-aluno.component.html',
  styleUrl: './area-aluno.component.scss'
})
export class AreaAlunoComponent {
  usuario?: Usuario;

  constructor(
    private service: AuthService,

  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();
    console.log(this.usuario)
  }
}
