import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../shared/class/Usuario.class';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-area-aluno',
  templateUrl: './sidebar-area-aluno.component.html',
  styleUrl: './sidebar-area-aluno.component.scss'
})
export class SidebarAreaAlunoComponent {
  usuario?: Usuario;

  constructor(
    private service: AuthService,
    private cookie: CookieService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();
    console.log(this.usuario)
  }

  direciona(destino = ''){
    if(destino == '')
      this.router.navigate(['areaAluno']);

  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/login']);
  }
}
