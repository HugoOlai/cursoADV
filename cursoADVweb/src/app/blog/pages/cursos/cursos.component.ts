import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { Curso } from '../../../shared/class/Curso.class';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../shared/class/Usuario.class';
import { CursosService } from '../../../services/cursos.service';
import { ArquivosService } from '../../../services/arquivos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  isMobile = Util.isMobile();
  carregando: boolean = true;
  carregandoGrupoEstudo: boolean = true;
  usuario: Partial<Usuario> = {};
  // usuario?: Usuario;

  listaCursos: Array<Curso> = [];
  listaGrupoEstudos: Array<Curso> = []
  constructor(
    private service: AuthService,
    public router: Router,
    private arquivosService: ArquivosService,
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

          this.carregando = true;
          if(this.usuario.tipo?.toLocaleUpperCase() == 'PROFESSOR' && curso.status == false){
            this.arquivosService.pegarArquivo(curso.idImg).subscribe(res=>{
              curso.src = res.base64;
              curso.idImg = res.id;
              //this.carregando = false;
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
            });



          } else if(curso.status){
            this.arquivosService.pegarArquivo(curso.idImg).subscribe(res=>{
              curso.src = res.base64;
              curso.idImg = res.id;
              //this.carregando = false;
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
            });
          }

          setTimeout(() => {
            this.carregando = false;
          }, 3000);
        });

        //this.carregando = false;

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
