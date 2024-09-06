import { Usuario } from './../../shared/class/Usuario.class';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Pergunta, Video } from './../../shared/class/Video';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoService } from '../../services/videos.service';
import { CursosService } from '../../services/cursos.service';
import { ActionsTable, HeaderTable, OptionsTable } from '../../components/table/table.class';
import { UsuarioService } from '../../services/usuario.service';
import { EditaRespostaComponent } from './edita-resposta/edita-resposta.component';

export interface DialogDataPergunta {
  pergunta: Pergunta;
}


@Component({
  selector: 'app-responder-perguntas',
  templateUrl: './responder-perguntas.component.html',
  styleUrl: './responder-perguntas.component.scss'
})
export class ResponderPerguntasComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();
  listaPerguntas: any = [];

  header: HeaderTable[] = [
    {
      description: 'Pergunta',
      key: 'conteudo', order: false, class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Resposta',
      key: 'resposta',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Nome do Usuário',
      key: 'nomeUsuario',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Video',
      key: 'nomeVideo',
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
    caption: 'Total de {@} perguntas',
    empty: 'Não existem perguntas para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    pageSize: 5,
    handle: ()=>{},
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Perguntas por página',

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
    private videoService: VideoService,
    private usuarioService: UsuarioService,
    private cookie: CookieService,
    private router: Router,
    private service: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

  ){

  }

  ngOnInit(): void {
    this.pegarPerguntas()
  }

  pegarPerguntas(){
    this.videoService.pegarPerguntas().subscribe((res: Array<Pergunta>)=>{
      res.forEach((pergunta: Pergunta) => {
          this.videoService.pegarPeloId(pergunta.idVideo).subscribe((video: Video)=>{
            pergunta.nomeVideo = video.nome
          });

          this.usuarioService.pegarUsuarioPorId(pergunta.idUsuario).subscribe((usuario: Usuario)=>{
            pergunta.nomeUsuario = usuario.nome
          });
      });

      this.listaPerguntas = res;
    }, err=>{
      if(err.status == 0){
        this.sair();
      }

    })
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }
  openDialog(item: any){
    const dialogRef = this.dialog.open(EditaRespostaComponent, {
      panelClass: "second-modal-backdrop",
      width: "80%",
      data: {
        pergunta: item
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var teste: any = dialogRef.componentRef;
      if(result.data){
        this.carregando = true;
        this.pegarPerguntas();
      }
    });
  }
}
