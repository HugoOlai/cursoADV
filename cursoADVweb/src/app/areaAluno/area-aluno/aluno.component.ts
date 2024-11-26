import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { CookieService } from 'ngx-cookie-service';
import { Curso } from '../../shared/class/Curso.class';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../shared/class/Usuario.class';
import { UsuarioService } from '../../services/usuario.service';
import { CursosService } from './../../services/cursos.service';
import { ArquivosService } from '../../services/arquivos.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.scss'
})
export class AlunoComponent {
  carregando: boolean = true;
  meusCursos: boolean = false;
  meusGruposEstudo: boolean = false;
  temPagamentoPendente: boolean = false;

  usuario: Partial<Usuario> = {};
  cursoSelecionado: Partial<Curso> = {};

  listaMeusCursos: Array<Curso> = [];
  listaMeusGruposEstudos: Array<Curso> = [];
  isMobile = Util.isMobile();

  constructor(
    private service: AuthService,
    public router: Router,
    private usuarioService: UsuarioService,
    private arquivosService: ArquivosService,
    private cookie: CookieService,
    private cursosService: CursosService
  ) { }

  ngOnInit() {
    this.usuario = this.service.getUser();
    console.log(this.usuario)
    this.usuarioService.pegarUsuario().subscribe({
      next: (res: any) =>{
        res.ultimaAulaAssistida = this.usuario.ultimaAulaAssistida;
        this.usuario = res;
        this.service.setCliente(res)
        if(this.usuario.listaCursos != undefined && this.usuario.listaCursos.length != 0) {

          this.cursosService.pegarTodos().subscribe({
            next: (cursos: Array<Curso>) =>{

              this.usuario.listaCursos?.forEach((cursoContratado: Curso) => {
                this.carregando = true;

                var cursoInformacoesCompletas = cursos.find(curs => curs.id == cursoContratado.id);
                console.log(cursoInformacoesCompletas)

                if(cursoInformacoesCompletas){
                  this.arquivosService.pegarArquivo(cursoInformacoesCompletas.idImg).subscribe(res=>{
                    if(cursoInformacoesCompletas != undefined)
                      cursoInformacoesCompletas.src = res.base64;

                    this.carregando = false;

                  });

                  cursoInformacoesCompletas.statusPago = cursoContratado.statusPago

                  if(cursoInformacoesCompletas.tipoCurso == "GRUPOESTUDOS"){
                    this.meusGruposEstudo = true;
                    if(!cursoInformacoesCompletas.statusPago){
                      if(cursoContratado.idPagamentoAsaas)
                        this.cursosService.conferirCobranca(cursoContratado.idPagamentoAsaas).subscribe({})

                      this.temPagamentoPendente = true;
                    }

                    this.listaMeusGruposEstudos.push(cursoInformacoesCompletas);

                  } else {
                    if(!cursoInformacoesCompletas.statusPago){
                      if(cursoContratado.idPagamentoAsaas)
                        this.cursosService.conferirCobranca(cursoContratado.idPagamentoAsaas).subscribe({})

                      this.temPagamentoPendente = true;
                    }
                    this.meusCursos = true;
                    this.listaMeusCursos.push(cursoInformacoesCompletas);
                  }

                }

              });


              if(this.temPagamentoPendente)
                this.pegarCursosPagamentoAtualizado();


            },
            error: err=>{
              this.carregando = false;

            }
          })
        } else {
          this.carregando = false;

        }

      }, error: err =>{
        console.log(err)
        this.carregando = false;
        if(err.statusText == "Unknown Error"){
          this.sair();
        }

      }

    })

  }

  pegarCursosPagamentoAtualizado(){
    this.usuarioService.pegarUsuario().subscribe({
      next: (res: any) =>{
        this.usuario = res;
        this.service.setCliente(res)
        //this.carregando = false;
        if(this.usuario.listaCursos != undefined) {
          //this.carregando = true;

          this.cursosService.pegarTodos().subscribe({
            next: (cursos: Array<Curso>) =>{
              this.listaMeusGruposEstudos = []
              this.listaMeusCursos = []
              this.meusCursos = false;
              this.meusGruposEstudo = false;
              this.carregando = true;

              this.usuario.listaCursos?.forEach((cursoContratado: Curso) => {
                var cursoInformacoesCompletas = cursos.find(curs => curs.id == cursoContratado.id);

                if(cursoInformacoesCompletas){
                  cursoInformacoesCompletas.statusPago = cursoContratado.statusPago

                  if(cursoInformacoesCompletas.tipoCurso == "GRUPOESTUDOS"){
                    this.meusGruposEstudo = true;
                    this.listaMeusGruposEstudos.push(cursoInformacoesCompletas);

                  } else {
                    this.meusCursos = true;
                    this.listaMeusCursos.push(cursoInformacoesCompletas);
                  }

                }

              });


              this.carregando = false;

            },
            error: err=>{
              this.carregando = false;

            }
          })
        }

      },
    })
  }
  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/login']);
  }

  assistirAula(curso: Curso){
    this.router.navigate([`areaAluno/aula/${curso.id}`]);
  }
  assistirAulaPeloId(id: string){
    this.router.navigate([`areaAluno/aula/${id}`]);
  }

}
