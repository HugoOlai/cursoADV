import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { Curso } from '../../../shared/class/Curso.class';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../shared/class/Usuario.class';
import { CursosService } from '../../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  isMobile = Util.isMobile();
  carregando: boolean = true;
  usuario: Partial<Usuario> = {};
  // usuario?: Usuario;

  listaCursos: Array<Curso> = [];
  listaGrupoEstudos: Array<Curso> = []
  constructor(
    private service: AuthService,
    public router: Router,
    public cursosService: CursosService
  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();

    this.cursosService.pegarTodos().subscribe({
      next: (res) =>{
        var listaIdsCursos: Array<string> = [];
        this.usuario.listaCursos?.forEach((cursoContratado: Curso) => {
          listaIdsCursos.push(cursoContratado.id)
        })

        res.forEach((curso: Curso) => {
          if(this.usuario.tipo?.toLocaleUpperCase() == 'PROFESSOR' && curso.status == false){
            if(curso.tipoCurso == "CURSO"){
              if(listaIdsCursos.includes(curso.id)){
                  curso.cursoContratado = true;
              }
                this.listaCursos.push(curso);
            }

            if(curso.tipoCurso == "GRUPOESTUDOS"){
              if(listaIdsCursos.includes(curso.id)){
                curso.cursoContratado = true;
              }

              this.listaGrupoEstudos.push(curso);
            }
          } else if(curso.status){
            if(curso.tipoCurso == "CURSO"){
              if(listaIdsCursos.includes(curso.id)){
                  curso.cursoContratado = true;
              }
                this.listaCursos.push(curso);
            }

            if(curso.tipoCurso == "GRUPOESTUDOS"){
              if(listaIdsCursos.includes(curso.id)){
                curso.cursoContratado = true;
              }

              this.listaGrupoEstudos.push(curso);
            }
          }

        });

        this.carregando = false;

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
