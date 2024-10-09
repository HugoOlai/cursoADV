import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../shared/class/Usuario.class';
import { VisualizarAlunoComponent } from '../../../area-professor/alunos/visualizar-aluno/visualizar-aluno.component';
import { EditarAlunoComponent } from '../editar-aluno/editar-aluno.component';

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
    public dialog: MatDialog,
    private router: Router,

  ) {
    this.usuario = this.service.getUser();

  }

  ngOnInit() {
    // var rota = this.usuario.tipo != null && this.usuario.tipo.toLocaleUpperCase() == 'PROFESSOR'? 'areaProfessor': 'areaAluno';
    // this.router.navigate([rota]);

    if(Object.values(this.usuario).length == 0)
      this.sair()

    // console.log(this.usuario?.src)
  }

  visualizarAluno(): void {
    const dialogRef = this.dialog.open(EditarAlunoComponent, {
      panelClass: "second-modal-backdrop",
      width:  this.isMobile? "100%" : "80%",
      data: {
        usuario: this.usuario
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var teste: any = dialogRef.componentRef;
      // if(result.data){
      //   this.carregando = true;
      //   this.pegarUsuarios();
      // }
    });
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
