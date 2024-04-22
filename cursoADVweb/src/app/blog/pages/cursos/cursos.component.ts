import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { Usuario } from '../../../shared/class/Usuario.class';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CursosService } from '../../../services/cursos.service';
import { Curso } from '../../../shared/class/Curso.class';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  isMobile = Util.isMobile();

  usuario?: Usuario;

  listaCursos: Array<Curso> = [];

  constructor(
    private service: AuthService,
    public router: Router,
    public cursosService: CursosService
  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();
    console.log(this.usuario)

    this.cursosService.pegarTodos().subscribe({
      next: (res) =>{
        console.log(res)
        this.listaCursos = res;

      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  redirecionar(curso: Curso){
    this.cursosService.set(curso)
    this.router.navigate(['blog/cursos/descricao']);

  }


}
