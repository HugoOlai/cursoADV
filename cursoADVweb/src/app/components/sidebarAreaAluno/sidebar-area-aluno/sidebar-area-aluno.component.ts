import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../shared/class/Usuario.class';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Util } from '../../../class/util.class';

@Component({
  selector: 'app-sidebar-area-aluno',
  templateUrl: './sidebar-area-aluno.component.html',
  styleUrl: './sidebar-area-aluno.component.scss'
})
export class SidebarAreaAlunoComponent {
  usuario: Usuario;
  isMobile = Util.isMobile();

  constructor(
    private service: AuthService,
    private cookie: CookieService,
    private router: Router,

  ) {
    this.usuario = this.service.getUser();

  }

  ngOnInit() {
    console.log(this.usuario)
    // var rota = this.usuario.tipo != null && this.usuario.tipo.toLocaleUpperCase() == 'PROFESSOR'? 'areaProfessor': 'areaAluno';
    // this.router.navigate([rota]);

    if(Object.values(this.usuario).length == 0)
      this.sair()

    // console.log(this.usuario?.src)
  }

  direciona(destino = ''){
    if(destino == '')
      this.router.navigate(['areaAluno']);

  }

  direcionaCursos(){
    this.router.navigate([`blog/cursos`]);

  }

  redirecionar(){
    this.router.navigate([`blog/quemSomos`]);
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/login']);
  }
}
