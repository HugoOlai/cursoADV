import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../shared/class/Usuario.class';

@Component({
  selector: 'app-sidebar-area-professor',
  templateUrl: './sidebar-area-professor.component.html',
  styleUrl: './sidebar-area-professor.component.scss'
})
export class SidebarAreaProfessorComponent {
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
    var rota = this.usuario.tipo != null && this.usuario.tipo.toLocaleUpperCase() == 'PROFESSOR'? 'areaProfessor': 'areaAluno';
    this.router.navigate([rota]);

    if(Object.values(this.usuario).length == 0)
      this.sair()

    // console.log(this.usuario?.src)
  }

  direciona(destino: string){
    this.router.navigate([destino]);

  }

  redirecionar(){
    this.router.navigate([`blog/quemSomos`]);
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }
}
