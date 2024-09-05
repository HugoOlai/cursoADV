import { saveAs } from 'file-saver'
import { Curso } from './../../shared/class/Curso.class';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, take } from 'rxjs';
import { AlunoComponent } from '../area-aluno/aluno.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CursosService } from '../../services/cursos.service';
import { Util } from '../../class/util.class';
import { Forum } from '../../shared/class/Forum.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../shared/class/Usuario.class';
import { Arquivo } from '../../shared/class/Arquivo.class';
import { PageEvent } from '@angular/material/paginator';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ArquivosService } from '../../services/arquivos.service';
import { VideoService } from '../../services/videos.service';
import { Video } from '../../shared/class/Video';
import { SelectedFiles } from '../../Admin/admin/admin.component';

interface FoodNode {
  nome: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  arquivo: any;
  nome: string,
  level: number;
}

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrl: './aula.component.scss'
})
export class AulaComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  ModuloSelecionado!: string;
  tarefaResposta: any = null;
  imagemSelecionada: any;
  imagensACarregar?: Array<Arquivo>;
  arquivoAula: Array<Arquivo> = [];
  nomeModulo!: string;
  descricao!: string;
  descricaoTarefa: string = "";
  idCurso: string = "";

  usuario: Partial<Usuario> = {};
  selecionarEmoji = false;
  descricaoSelecionado = true;
  tarefaSelecionada = false;
  carregando = true;
  curso: Partial<Curso> = {};
  listaSearch: Array<Forum> = [];
  isMobile = Util.isMobile();
  formulario: FormGroup;
  campoSelecionado: string = '';
  tipoCurso: string = 'CURSO';

  listaForuns: Array<Forum> = []
  listaAquecimento: Array<any> = []
  TREE_DATA: FoodNode[] = [];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      arquivo: node,
      nome: node.nome,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private service: AuthService,
    private _snackBar: MatSnackBar,
    private cursosService: CursosService,
    private activedRoute: ActivatedRoute,
    private videoService: VideoService,
    private arquivosService: ArquivosService,

  ) {
    this.formulario = this.fb.group({
      Titulo: [''],
      Conteudo: [''],})
  }

  ngOnInit() {

    this.usuario = this.service.getUser();
    this.activedRoute.params.subscribe((params: any) => {
      try {
        this.curso.id = params['id'];

        if (this.curso.id != undefined) {
          this.carregando = true;

          this.cursosService.pegar(this.curso).subscribe({
            next: (curso: Curso) =>{
              this.curso = curso;
              if(this.curso.tipoCurso)
                this.tipoCurso = this.curso.tipoCurso

              if (this.curso.id != undefined){
                this.carregando = true;

                this.arquivosService.pegarArquivos(this.curso.id).subscribe(res=>{
                  res.forEach((arquivo: any) => {
                    this.arquivoAula.push(arquivo);
                  });
                  console.log({arquivoAula:this.arquivoAula})

                  this.videoService.pegarTodos().subscribe((resVideo: Array<Video>)=>{
                    var lista: Array<Video> = []
                    resVideo.forEach(video => {
                      if(video.idCurso == this.curso.id){
                        video.dataLancamentoFormatada = Util.dataFormatada(video.dataLancamento);
                        lista.push(video)
                      }
                    });

                    this.curso.listaVideos = lista;
                    if(this.curso.listaVideos != null && this.curso.tipoCurso != 'GRUPOESTUDOS'){
                      var listaArq: Array<Arquivo> = [];

                      this.curso.listaVideos[0].aulaAtual = true;
                      this.curso.listaVideos.forEach(video => {
                        if(video.aulaAtual == true){
                          this.idCurso = video.id
                          this.ModuloSelecionado = video.nomeArquivo;
                          this.nomeModulo = video.nome;
                          this.descricao = video.descricao;

                          if(video.listaPerguntas != null){

                            video.listaPerguntas.forEach((pergunta: any) => {
                              console.log(pergunta)
                              var obj: Forum = {
                                usuario: this.usuario,
                                titulo: pergunta.titulo,
                                conteudo: pergunta.conteudo,
                                resposta: pergunta.resposta == null? 'Aguardando resposta' : pergunta.resposta
                              }

                              if(this.imagensACarregar != undefined || this.imagensACarregar != null)
                                obj.arquivos = [...this.imagensACarregar]

                              this.listaForuns.unshift(obj);
                              this.listaSearch = [];
                              this.mergeSort(this.listaForuns, 0, this.listaForuns.length);

                            });
                          }
                          // video.aulaAtual = true;

                          // this.arquivoAula = video.arquivos

                          if(video.listaIdsArquivos != null)
                            video.listaIdsArquivos.forEach((id: string) => {
                              this.arquivoAula.forEach(arquivo => {
                                if(id == arquivo.id){
                                  listaArq.push(arquivo)
                                }
                              });

                              console.log(this.arquivoAula)

                            });
                        }
                        });
                        this.arquivoAula = listaArq;
                    }
                    this.carregando = false;
                  })

                })
              }

              if(this.tipoCurso == 'GRUPOESTUDOS'){
                if(this.curso.materialApoio)
                  this.descricao = this.curso.materialApoio
              }



              //   this.arquivoAula = this.curso.listaArquivosApoio;
              //   if(this.curso.listaArquivosApoio.length != null){
              //     this.curso.listaArquivosApoio.forEach((arquivo: any) => {
              //       // if(arquivo.tipoArquivo == "Leituras para aquecimento"){

              //       // }
              //       this.listaAquecimento.push(arquivo)
              //     });

              //     if(this.listaAquecimento.length > 0){
              //       this.TREE_DATA.push({
              //         nome: 'Leituras para ir aquecendo',
              //         children: this.listaAquecimento,
              //       })

              //       this.dataSource.data = this.TREE_DATA;

              //     }

              //   }
              // }



            },
            error: (err:any)=> {
              SnackBarComponent.prototype.texto = "Erro ao pegar o curso";
              SnackBarComponent.prototype.tipo = 'warning';
              this.openSnackBar('warning');
              this.carregando = false;

            }
          });
        }



      } catch (error) {
        console.log(error)
      }
    });
  }
  defineTempo(modulo: any){
    var vid = (document.getElementById(modulo) as HTMLMediaElement);
    var seg: number  = 0;
    vid.onloadedmetadata = function(){
      seg = vid.duration;
    }
    var h = new Date(seg * 1000);
   // var data = new Date(seg * 1000);
  //  console.log(new Date(seg * 1000))

  // return h.getHours() +' : '+ h.getSeconds();

  }

  download(arquivo: Arquivo){
    // 'data:application/octet-stream;base64,' +
    var linkSource = arquivo.base64;
    const downloadLink = document.createElement('a');
    const fileName = `${arquivo.nome}`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

  }

  selecionaCurso(novoVideo: any){
    var novaLista: Array<any> = [];
    if(this.curso.listaVideos != null && this.curso.listaVideos != undefined){
      this.curso.listaVideos.forEach(video => {
          if(video.nome == novoVideo.nome){
            this.idCurso = video.id;
            video.aulaAtual = true;
            this.ModuloSelecionado = video.src;
            this.ModuloSelecionado = video.nomeArquivo;
            this.nomeModulo = video.nome;
            this.descricao = video.descricao;

          }else
            video.aulaAtual = false;

            novaLista.push(video)
      });

      this.curso.listaVideos = novaLista;
    }
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  voltarInicio(){
    this.router.navigate([`areaAluno`]);
  }

  upload(event: any) {
    const keys = Object.keys(event.target.files);
    var files = event.target.files
    var reader = new FileReader();
    const result = new AsyncSubject<SelectedFiles[]>();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      if(event.target != null)
        this.imagemSelecionada = reader.result;
    }

    Object.keys(files)?.forEach(async (file, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        this.tarefaResposta = { nome: files[i]?.name, file: "", base64: reader?.result as string }
        // this.listaArquivosApoio = this.listaArquivosApoio?.filter(f => f?.name != files[i]?.name)
        // // this.listaArquivosApoio.push(files[i])
        // this.listaArquivosApoio.push({ nome: files[i]?.name, file: "",
        //   base64: reader?.result as string })
        // this.listaArquivosApoioNovos.push({ nome: files[i]?.name, file: "",
        //   base64: reader?.result as string })
        // result.next(this.listaArquivosApoio);

        if (files?.length === (i + 1)) {
          result.complete();
        }

      };
    });

    this.imagemSelecionada = event.target.files[0]
  }

  addEmoji(emoji: any){
    // this.formulario.get('Conteudo').setValue(emoji.emoji.native);
    var montarConteudo = this.formulario.controls[this.campoSelecionado == ''? 'Conteudo':this.campoSelecionado].value + " " + emoji.emoji.native

    this.formulario.controls[this.campoSelecionado == ''? 'Conteudo':this.campoSelecionado].setValue(montarConteudo)

  }

  handlePageEvent(e: PageEvent) {
    var pageSize = e.pageSize;

    const startItem = e.pageIndex * pageSize;
    const endItem = startItem + pageSize;
    let lista = this.listaForuns.slice(startItem, endItem);

    this.init(lista);
  }

  init(lista: any[]) {
    this.listaSearch = [];

    lista = lista.slice(0, this.listaForuns.length);

    this.mergeSort(lista, 0, lista.length);
  }

  irParapublicacao() {
    // console.log('irParapublicacao')
  }

  mergeSort(lista: Array<any>, posicaoInicio: number, posicaoFim: number){
    if(posicaoInicio == 0 && posicaoFim == 0) return;

    if(lista.length > 100){
      var listapPrimeiraParte = lista.slice(0, Math.round(lista.length/2));
      var listaSegundaParte = lista.slice(Math.round(lista.length/2));

      listapPrimeiraParte.forEach((item: any) => {
        this.listaSearch.push(item)
      });

      this.mergeSort(listaSegundaParte, 0, listaSegundaParte.length);
    }else{
      lista.forEach(item => {
        this.listaSearch.push(item)
      });

      return;
    }
  }

  Limpar(){
    this.formulario.controls['Titulo'].setValue('')
    this.formulario.controls['Conteudo'].setValue('')
    this.imagemSelecionada = null
  }

  Adicionar(){
    if(this.formulario.controls['Titulo'].value == ''
    || this.formulario.controls['Conteudo'].value == ''){

    } else {
      var obj: Forum = {
        usuario: this.usuario,
        titulo: this.formulario.controls['Titulo'].value,
        conteudo: this.formulario.controls['Conteudo'].value,
        resposta: 'Aguardando resposta'

      }

      if(this.imagensACarregar != undefined || this.imagensACarregar != null)
        obj.arquivos = [...this.imagensACarregar]

      this.listaForuns.unshift(obj);
      this.listaSearch = [];
      this.mergeSort(this.listaForuns, 0, this.listaForuns.length);
      var pergunta = {
        idVideo: this.idCurso,
        idUsuario: this.usuario.id,
        titulo: this.formulario.controls['Titulo'].value,
        conteudo: this.formulario.controls['Conteudo'].value,
      }

      this.videoService.cadastrarPergunta(pergunta).subscribe(res=>{});
      this.Limpar();

    }

  }
}
