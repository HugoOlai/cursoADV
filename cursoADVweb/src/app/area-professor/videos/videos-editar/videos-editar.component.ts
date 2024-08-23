import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { FormControl } from '@angular/forms';
import { Util } from '../../../class/util.class';
import { Video } from '../../../shared/class/Video';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CursosService } from '../../../services/cursos.service';
import { VideoService } from '../../../services/videos.service';
import { ArquivosService } from '../../../services/arquivos.service';
import { Curso } from '../../../shared/class/Curso.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDataCurso } from '../../cursos/cursos.component';
import { DialogDataVideo } from '../videos.component';

@Component({
  selector: 'app-videos-editar',
  templateUrl: './videos-editar.component.html',
  styleUrl: './videos-editar.component.scss'
})
export class VideosEditarComponent {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;
  toppings = new FormControl([""]);

  nomeVideo = "";
  descricaoVideo = "";
  nomeArquivo = "";

  cursoSelecionado: any;
  isMobile = Util.isMobile();
  carregando: boolean = false;
  carregandoArquivos: boolean = false;
  listaVideo: Array<Video> = [];
  listaNomesCursos: Array<any> = [];
  toppingList: Array<any> = [];
  listaArquivos: Array<any> = [];
  listaArquivosSelecionados: Array<any> = [];
  arquivosSelecionado: Array<string> = ["RESP 1930593 - Execução Alimentos - CUMULAÇÃO DE TÉCNICAS EXECUTIVAS.pdf","Cadernos Defensoria - habitação e urbanismo -Def-Pub-SP_n.5_1.pdf"];
  constructor(
    private router: Router,
    private service: AuthService,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    private cursosService: CursosService,
    private videoService: VideoService,
    private arquivosService: ArquivosService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataVideo,
    public dialogRef: MatDialogRef<VideosEditarComponent>,
  ){ }

  ngOnInit(): void {
    console.log(this.data.video)
    this.pegarCursos()
  }

  pegarCursos(){
    this.listaNomesCursos = [];
    this.listaVideo = [];

    this.carregando = true;
    this.cursoSelecionado = this.data.video.idCurso;
    this.nomeVideo = this.data.video.nome
    this.nomeArquivo = this.data.video.nomeArquivo
    this.descricaoVideo = this.data.video.descricao

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
    //   console.log(res)
    //   res.forEach(video => {
    //     video.dataLancamentoFormatada = Util.dataFormatada(video.dataLancamento);
    //     this.listaVideo.push(video)
    //   });
    // })
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

        if(this.data.video.listaIdsArquivos != null){
          this.data.video.listaIdsArquivos.forEach(id => {
            if(id == arquivo.id){
              this.arquivosSelecionado.push(arquivo.nome);
              this.toppings = new FormControl(this.arquivosSelecionado)
            }
          });
        }
      }

    });
  }

  AdicionarVideo(){
    this.carregando = true;
    var form = this.toppings.value;
    var lista: Array<string> = []
    this.listaArquivosSelecionados.forEach(arquivo => {
      lista.push(arquivo.id);
    });

    this.videoService.editar({ id: this.data.video.id, Nome: this.nomeVideo, NomeArquivo: this.nomeArquivo, IdCurso: this.cursoSelecionado, listaIdsArquivos: this.data.video.listaIdsArquivos ,Descricao: this.descricaoVideo})
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
        this.fechar()

      }
    })
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }

  fechar(){
    this.dialogRef.close();
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
}
