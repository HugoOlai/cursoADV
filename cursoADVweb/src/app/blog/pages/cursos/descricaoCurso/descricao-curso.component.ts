import { Component } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { Curso } from '../../../../shared/class/Curso.class';
import { Usuario } from '../../../../shared/class/Usuario.class';
import { Util } from '../../../../class/util.class';

@Component({
  selector: 'app-descricao-curso',
  templateUrl: './descricao-curso.component.html',
  styleUrl: './descricao-curso.component.scss'
})
export class DescricaoCursoComponent {
  isMobile = Util.isMobile();

  usuario?: Usuario;
  curso?: Curso;

  listaCursos: Array<Curso> = [];

  constructor(
    private service: AuthService,
    public router: Router,
    public cursosService: CursosService
  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();
    this.curso = this.cursosService.get();
    console.log(this.curso)
    if(this.curso == undefined || this.curso == null){
      this.router.navigate(['blog/cursos']);

    }

  }
}
