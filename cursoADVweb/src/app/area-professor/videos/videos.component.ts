import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Util } from '../../class/util.class';
import { Video } from '../../shared/class/Video';
import { CookieService } from 'ngx-cookie-service';
import { Curso } from '../../shared/class/Curso.class';
import { AuthService } from '../../services/auth.service';
import { VideoService } from '../../services/videos.service';
import { CursosService } from '../../services/cursos.service';
import { ArquivosService } from '../../services/arquivos.service';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VideosEditarComponent } from './videos-editar/videos-editar.component';


export interface DialogDataVideo {
  video: Video;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;
  toppings = new FormControl('');

  nomeVideo: string  = "";
  nomeArquivo: string  = "";
  descricaoVideo: string  = "";
  cursoSelecionado: string = "";

  isMobile = Util.isMobile();
  carregando: boolean = false;
  carregandoArquivos: boolean = false;

  toppingList: Array<any> = [];
  listaVideo: Array<Video> = [];
  listaArquivos: Array<any> = [];
  listaNomesCursos: Array<any> = [];
  listaArquivosSelecionados: Array<any> = [];

  constructor(
    private router: Router,
    private service: AuthService,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    private cursosService: CursosService,
    private videoService: VideoService,
    private arquivosService: ArquivosService,
    public dialog: MatDialog,

  ){ }

  ngOnInit(): void {
    this.pegarCursos()
  }

  pegarCursos(){
    this.listaNomesCursos = [];
    this.listaVideo = [];

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

    this.videoService.pegarTodos().subscribe((res: Array<Video>)=>{
      res.forEach(video => {
        video.dataLancamentoFormatada = Util.dataFormatada(video.dataLancamento);
        this.listaVideo.push(video)
      });
    })
  }

  pegarArquivosCurso(id: string){
    this.carregandoArquivos = true;

    this.arquivosService.pegarArquivos(id).subscribe((res: Array<any>)=>{
      res.forEach((arquivo: any) => {
        this.listaArquivos.push(arquivo);
        this.toppingList.push(arquivo.nome)
      });

      this.carregandoArquivos = false;
    })
  }

  definirArquivos(topping: string){
    this.listaArquivos.forEach(arquivo => {
      if(arquivo.nome == topping){
        var arquivoEncontrado = this.listaArquivosSelecionados.find(a=> a.nome == topping)
        if(!arquivoEncontrado){
          this.listaArquivosSelecionados.push(arquivo)
        } else {
          var lista = this.listaArquivosSelecionados.filter((a: any)=> {if(a.nome != topping) return a})
          this.listaArquivosSelecionados = lista;
        }
      }

    });
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  deletarVideo(video: Video){
    this.videoService.deletar(video).subscribe((arg: any) =>{
    }, (err: any) =>{
      console.log(err)
      this.carregando = false;

      if(err.status == 200){
        SnackBarComponent.prototype.texto = "VIDEO REGISTRADO COM SUCESSO"
        SnackBarComponent.prototype.tipo = 'success';
        this.openSnackBar('success');
        this.carregando = false;
        this.pegarCursos();
      }
    });

  }

  openDialog(item: Video): void {
    const dialogRef = this.dialog.open(VideosEditarComponent, {
      panelClass: "second-modal-backdrop",
      width: "80%",
      data: {
        video: item
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var teste: any = dialogRef.componentRef;
      if(result.data){
        this.carregando = true;
        this.pegarCursos();
      }
    });
  }

  AdicionarVideo(){
    // this.carregando = true;
    var form = this.toppings.value;
    var lista: Array<string> = []
    this.listaArquivosSelecionados.forEach(arquivo => {
      lista.push(arquivo.id);
    });

    if(this.nomeVideo == "" || this.descricaoVideo == "" || this.nomeArquivo == "" || this.cursoSelecionado == ""){
      SnackBarComponent.prototype.texto = "PREENCHA TODOS OS CAMPOS"
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.carregando = false;
    } else {
      this.videoService.cadastrar({ Nome: this.nomeVideo, NomeArquivo: this.nomeArquivo, IdCurso: this.cursoSelecionado, listaIdsArquivos: lista ,Descricao: this.descricaoVideo})
        .subscribe((res: any) => {
        this.carregando = false;

      }, (err: any) =>{
        console.log(err)
        this.carregando = false;

        if(err.status == 200){
          SnackBarComponent.prototype.texto = "VIDEO REGISTRADO COM SUCESSO"
          SnackBarComponent.prototype.tipo = 'success';
          this.openSnackBar('success');
          this.carregando = false;
          this.pegarCursos()

        }
      })
    }

  }
}
