import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Util } from '../../../class/util.class';
import { Component, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Video } from '../../../shared/class/Video';
import { DialogDataVideo } from '../videos.component';
import { Curso } from '../../../shared/class/Curso.class';
import { AuthService } from '../../../services/auth.service';
import { Arquivo } from './../../../shared/class/Arquivo.class';
import { VideoService } from '../../../services/videos.service';
import { CursosService } from '../../../services/cursos.service';
import { ArquivosService } from '../../../services/arquivos.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
  arquivosSelecionado: Array<string> = [];
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

    if(this.data.video.listaIdsArquivos != null)
      this.arquivosService.pegarArquivos(this.data.video.idCurso).subscribe((res: Array<any>)=> {
        this.listaArquivos = res;
        this.data.video.listaIdsArquivos.forEach(idArquivo => {

          var arquivoEncontrado = res.find((ar: Arquivo) => ar.id == idArquivo)

          if(arquivoEncontrado){
            this.arquivosSelecionado.push(arquivoEncontrado.nome);
            this.listaArquivosSelecionados.push(arquivoEncontrado);
            this.toppings = new FormControl(this.arquivosSelecionado)
          }
        });
      })


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

  definirArquivos(topping: any){
    if(this.toppings.value?.length != 0){
      var lista: any = [];
      var ids: any = []

      if(this.toppings.value){
        this.toppings.value.forEach(nome => {
          var arquivoEncontrado = this.listaArquivos.find(arquivo=> arquivo.nome == nome)
          if(arquivoEncontrado){
            lista.push(arquivoEncontrado);
            ids.push(arquivoEncontrado.id)
          }
        });

        this.listaArquivosSelecionados = lista;
        this.data.video.listaIdsArquivos = ids;

      }

    }

    // var arquivoEncontrado = this.listaArquivosSelecionados.find(arquivo => arquivo.nome == topping[topping.length -1])
    // console.log(arquivoEncontrado)
    // if(arquivoEncontrado == undefined){
    //   var pegarArquivo = this.listaArquivos.find(arquivo=> arquivo.nome == topping[topping.length -1])
    //   this.listaArquivosSelecionados.push(pegarArquivo)
    //   console.log(this.listaArquivosSelecionados)
    // } else {
    //   var novaLista: any = [];
    //   this.listaArquivosSelecionados.forEach(arquivo => {
    //     if(topping.length != 0)
    //       if(arquivo.nome != topping[topping.length -1])
    //         novaLista.push(arquivo)
    //   });
    //   this.listaArquivosSelecionados = novaLista;
    //   console.log(novaLista)
    // }

    // var ids: any = []
    // this.listaArquivosSelecionados.forEach(arquivo => {
    //   ids.push(arquivo.id)
    // });

    // this.data.video.listaIdsArquivos = ids;



    // this.listaArquivos.forEach(arquivo => {
    //   console.log({listaArquivosSelecionados: this.listaArquivosSelecionados})

    //   var arquivoEncontrado = this.listaArquivosSelecionados.find((a: Arquivo) => a != undefined && a.nome == topping)
    //   console.log({arquivoEncontrado: arquivoEncontrado})
      // if(!arquivoEncontrado || arquivoEncontrado == undefined){
      //   this.listaArquivosSelecionados.push(arquivo)
      //   this.arquivosSelecionado.push(arquivo.nome);
      //   console.log({arquivosSelecionado: this.arquivosSelecionado})
      //   //this.toppings = new FormControl(ar)

      // } else {
      //   var lista = this.listaArquivosSelecionados.filter((a: Arquivo)=> a.nome != topping)
      //   this.listaArquivosSelecionados = lista;
      //   // if(arquivoEncontrado){
      //     this.arquivosSelecionado.push(arquivo.nome);
      //     //this.toppings = new FormControl(this.arquivosSelecionado)
      //   // }
      // }

      // if(this.data.video.listaIdsArquivos != null){
      //   this.data.video.listaIdsArquivos.forEach(id => {
      //     if(id == arquivo.id){
      //       this.arquivosSelecionado.push(arquivo.nome);
      //       this.toppings = new FormControl(this.arquivosSelecionado)
      //     }
      //   });
      // }


    // });
  }

  AtualizarrVideo(){
    this.carregando = true;
    var form = this.toppings.value;
    var lista: Array<string> = []
    // this.listaArquivosSelecionados.forEach((arquivo: Arquivo) => {
    //   if(arquivo.id)
    //     lista.push(arquivo.id);
    // });

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
        this.fechar(true)

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

  fechar(atualiza: boolean = false){
    this.dialogRef.close({data: atualiza});
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
