import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { Video } from '../../shared/class/Video';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Curso } from '../../shared/class/Curso.class';
import { AuthService } from '../../services/auth.service';
import { VideoService } from '../../services/videos.service';
import { CursosService } from '../../services/cursos.service';
import { TarefaService } from '../../services/tarefa.service';
import { ArquivosService } from '../../services/arquivos.service';
import { TarefaEditarComponent } from './TarefaEditar/TarefaEditar.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { ActionsTable, HeaderTable, OptionsTable } from '../../components/table/table.class';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Tarefa } from '../../shared/class/Tarefa class';

export interface DialogDataTarefa {
  tarefa: Tarefa;
  listaNomesVideos: Array<any>
}

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class tarefaComponent {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;

  carregando: boolean = false;
  isMobile = Util.isMobile();
  tituloTarefa: string = "";
  descricaoTarefa: string = "";
  videoSelecionado: string = "";

  listaNomesCursos: Array<any> = [];
  listaNomesVideos: Array<any> = [];
  listaTarefas: Array<Tarefa> = [];

  header: HeaderTable[] = [
    {
      description: 'Titulo',
      key: 'nome',
      order: false, class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Data de lançamento',
      key: 'dataLancamentoFormatada',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Nome video vinculado',
      key: 'nomeVideo',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Descrição',
      key: 'descricao',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    }
  ]

  options: OptionsTable = {
    select: false,
    selectAll: false,
    action: true,
    searchShow: false,
    lineSize: true,
    placeholder: '',
    captionShow: true,
    caption: 'Total de {@} alunos',
    empty: 'Não existem alunos para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    pageSize: 5,
    handle: ()=>{},
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Alunos por página',

  };

  actions: ActionsTable[] = [
    {
      description: 'Editar',
      icon: 'edit',
      isButton: true,
      class: 'btn btn-primary btn-sm rounded-pill icon-button-only',
      tooltip: '',
      classIcon: 'ft-14',
      placement: 'top',
      handle: (item: any) => { this.openDialog(item) }
    }
  ]

  constructor(
    private router: Router,
    private service: AuthService,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    private cursosService: CursosService,
    private videoService: VideoService,
    private tarefaService: TarefaService,
    public dialog: MatDialog,

  ){ }

  ngOnInit(): void {
    this.pegarVideos();
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }

  openDialog(item: Tarefa): void {
    const dialogRef = this.dialog.open(TarefaEditarComponent, {
      panelClass: "second-modal-backdrop",
      width: "80%",
      data: {
        tarefa: item,
        listaNomesVideos: this.listaNomesVideos
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var teste: any = dialogRef.componentRef;
      if(result.data){
        this.carregando = true;
        this.pegarVideos();

      }
    });
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  pegarVideos(){
    this.carregando = true;
    this.videoService.pegarTodos().subscribe((res: Array<Video>) => {
      res.forEach((video: Video)=>{
        this.listaNomesVideos.push({id: video.id, nome: video.nome})
      })

      this.pegarTarefas();

    })

  }

  pegarCursos(){
    this.listaNomesCursos = [];
    // this.listaVideo = [];

    this.carregando = true;

    this.cursosService.pegarTodos().subscribe((res: Array<Curso>)=>{
      res.forEach((curso: Curso) => {
        this.listaNomesCursos.push({id: curso.id, nome: curso.titulo})
      });
      this.carregando = false
    }, err =>{
      // console.log(err)
      if(err.statusText == "Unknown Error"){
        SnackBarComponent.prototype.texto = `SESSÃO EXPIROU, CONECTE NOVAMENTE`;
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('warning');
        this.sair();
      }
    })

    // this.videoService.pegarTodos().subscribe((res: Array<Video>)=>{
    //   res.forEach(video => {
    //     video.dataLancamentoFormatada = Util.dataFormatada(video.dataLancamento);
    //     this.listaVideo.push(video)
    //   });
    // })
  }

  pegarTarefas(){
    this.listaTarefas = [];
    this.tarefaService.pegarTodos().subscribe((res: Array<Tarefa>) =>{
      res.forEach((tarefa: Tarefa) => {
        tarefa.dataLancamentoFormatada = Util.dataFormatada(tarefa.dataLancamento)
        //tarefa.nomeVideo = this.listaNomesVideos.find(v=> v.id == tarefa.idVideo).nome;
        this.listaTarefas.push(tarefa)
      });
      this.carregando = false;

    })
  }

  adicionarTarefa(){
    // this.carregando = true;

    if(this.tituloTarefa == "" || this.descricaoTarefa == "" || this.videoSelecionado == ""){
      SnackBarComponent.prototype.texto = "PREENCHA TODOS OS CAMPOS"
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.carregando = false;
    } else {
      this.carregando = true;

      this.tarefaService.cadastrar({ Nome: this.tituloTarefa, Descricao: this.descricaoTarefa, IdVideo: this.videoSelecionado})
        .subscribe((res: any) => {
        this.carregando = false;
        this.pegarTarefas()

      }, (err: any) =>{
        console.log(err)
        this.carregando = false;

        if(err.status == 200){
          SnackBarComponent.prototype.texto = "TAREFA REGISTRADA COM SUCESSO"
          SnackBarComponent.prototype.tipo = 'success';
          this.openSnackBar('success');
          this.carregando = true;
          this.pegarTarefas()

        }

        if(err.status == 500){
          SnackBarComponent.prototype.texto = "TAREFA JÁ FOI CADASTRADA"
          SnackBarComponent.prototype.tipo = 'warning';
          this.openSnackBar('warning');
          this.carregando = true;
          this.pegarTarefas()

        }
      })
    }

  }
}
