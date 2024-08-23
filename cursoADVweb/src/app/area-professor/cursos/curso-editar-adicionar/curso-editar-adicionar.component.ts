import { AsyncSubject } from 'rxjs';
import { Util } from '../../../class/util.class';
import { Component, Inject } from '@angular/core';
import { DialogDataCurso } from '../cursos.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Arquivo } from '../../../shared/class/Arquivo.class';
import { CursosService } from '../../../services/cursos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ArquivosService } from '../../../services/arquivos.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}

@Component({
  selector: 'app-curso-editar-adicionar',
  templateUrl: './curso-editar-adicionar.component.html',
  styleUrl: './curso-editar-adicionar.component.scss'
})
export class CursoEditarAdicionarComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  carregando = false;
  criarCurso = false;
  imgCurso: any;
  formularioCurso: FormGroup;
  isMobile = Util.isMobile();

  dataLancamento: any;
  tipoSelecionado: any;
  statusSelecionado: any;
  imagemSelecionada: any;

  imagensACarregar?: Array<Arquivo>;
  topicos: Array<String> = [];
  listaArquivosApoio:Array<any> = [];
  listaArquivosApoioNovos:Array<any> = [];

  status: Array<any> = [
    {
      id: 1,
      nome: "ATIVO",
    },
    {
      id: 2,
      nome: "INATIVO",
    }
  ]

  tipos: Array<any> = [
    {
      id: 1,
      nome: "CURSO",
    },
    {
      id: 2,
      nome: "GRUPOESTUDOS",
    }
  ]

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: AuthService,
    private cursosService: CursosService,
    private arquivosService: ArquivosService,
    public usuarioService: UsuarioService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCurso,
    public dialogRef: MatDialogRef<CursoEditarAdicionarComponent>,

  ){
    this.formularioCurso = this.fb.group({
      Nome: [data.curso.titulo],
      Titulo: [data.curso.titulo],
      Tipo: [data.curso.tipoCurso == null? "CURSO" : data.curso.tipoCurso],
      Status: [data.curso.status == null || data.curso.status == false? "INATIVO" : "ATIVO"],
      Subtitulo: [data.curso.subtitulo],
      DataLancamento: [data.curso.dataLançamentoFormatada],
      Estrutura: [data.curso.estrutura],
      MaterialApoio: [data.curso.materialApoio],
      Objetivo: [data.curso.objetivo],
      Topico: [null],
      Valor: [data.curso.valor],
      ValorFormatado: [Util.formataValor(data.curso.valor)],
    })
  }

  ngOnInit(): void {
    this.criarCurso = Util.isNullOrEmpty(this.data.curso.id)? true : false;
    this.dataLancamento = this.formularioCurso.get('DataLancamento');
    this.dataLancamento.disable();
    if(!this.criarCurso){
      if(this.data.curso.topcos != null)
        this.topicos = [...this.data.curso.topcos]

      // if(this.data.curso.listaArquivosApoio != null)
      //   this.listaArquivosApoio = [...this.data.curso.listaArquivosApoio]
      this.carregando = true;
      this.arquivosService.pegarArquivos(this.data.curso.id).subscribe(res=>{
        res.forEach((arquivo: any) => {
          this.listaArquivosApoio.push(arquivo);
        });

        this.carregando = false;
      })
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

  formataValor(){
    var form = this.formularioCurso.value;
    this.formularioCurso.get('ValorFormatado')?.setValue(Util.formataValor(form.ValorFormatado))
    this.formularioCurso.get('Valor')?.setValue(form.ValorFormatado)
  }

  Limpar(){
    this.imagemSelecionada = null
  }

  uploadImgCurso(event: any){
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
        //this.listaArquivosApoio = this.listaArquivosApoio?.filter(f => f?.name != files[i]?.name)
        // this.listaArquivosApoio.push(files[i])
        this.imgCurso = { nome: files[i]?.name, file: "",
          base64: reader?.result as string }
        this.data.curso.src = this.imgCurso.base64;

        result.next(this.imgCurso);
        if (files?.length === (i + 1)) {
          result.complete();
        }

      };
    });

    this.imagemSelecionada = event.target.files[0]
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
        this.listaArquivosApoio = this.listaArquivosApoio?.filter(f => f?.name != files[i]?.name)
        // this.listaArquivosApoio.push(files[i])
        this.listaArquivosApoio.push({ nome: files[i]?.name, file: "",
          base64: reader?.result as string })
        this.listaArquivosApoioNovos.push({ nome: files[i]?.name, file: "",
          base64: reader?.result as string })
        result.next(this.listaArquivosApoio);
        if (files?.length === (i + 1)) {
          result.complete();
        }

      };
    });

    this.imagemSelecionada = event.target.files[0]
  }

  adicionarNovoTopico(){
    var topico = this.formularioCurso.get("Topico");
    if(topico?.value != '')
      this.topicos.push(topico?.value)

    topico?.setValue("");

  }

  adicionaTopico(event: any, index: number){
    if(event.target.value == ""){
      this.topicos.splice(index, 1)
    } else {
      this.topicos[index] = event.target.value;
    }
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

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    var form = this.formularioCurso.value;
    form.id = this.data.curso.id;
    form.topcos = this.topicos;
    form.tipoCurso = form.Tipo
    form.Status = form.Status == 'INATIVO'? false : true;
    form.src = this.data.curso.src;

    this.carregando = true;
    this.cursosService.editar(form).subscribe(res => {
      if(this.listaArquivosApoioNovos.length > 0){
        this.listaArquivosApoioNovos.forEach(arquivo => {
          this.cursosService.adicionarArquivo(arquivo, res).subscribe(res => {
            SnackBarComponent.prototype.texto = "ARQUIVO ADICIONADO"
            SnackBarComponent.prototype.tipo = 'success';
            this.openSnackBar('success');
            this.carregando = false;

          }, err => {
            console.log(err);
            if(err.status == 200){
              SnackBarComponent.prototype.texto = "ARQUIVO ADICIONADO"
              SnackBarComponent.prototype.tipo = 'success';
              this.openSnackBar('success');
              this.carregando = false;
            }

          })
        });
      } else {
        SnackBarComponent.prototype.texto = this.criarCurso? "CURSO CRIADO COM SUCESSO":"CURSO ATUALIZADO COM SUCESSO"
        SnackBarComponent.prototype.tipo = 'success';
        this.openSnackBar('success');
        this.carregando = false;
        this.fechar();
      }

    }, err =>{
      console.log(err)
      if(err.status == 200){
        if(this.listaArquivosApoioNovos.length > 0){
          this.listaArquivosApoioNovos.forEach(arquivo => {
            this.cursosService.adicionarArquivo(arquivo, err.error.text).subscribe(res => {
              SnackBarComponent.prototype.texto = "ARQUIVO ADICIONADO"
              SnackBarComponent.prototype.tipo = 'success';
              this.openSnackBar('success');
              this.carregando = false;

            }, err => {
              console.log(err);
              if(err.status == 200){
                SnackBarComponent.prototype.texto = "ARQUIVO ADICIONADO"
                SnackBarComponent.prototype.tipo = 'success';
                this.openSnackBar('success');
                this.carregando = false;
              }
            })
          });

        } else {
          SnackBarComponent.prototype.texto = this.criarCurso? "CURSO CRIADO COM SUCESSO":"CURSO ATUALIZADO COM SUCESSO"
          SnackBarComponent.prototype.tipo = 'success';
          this.openSnackBar('success');
          this.carregando = false;
          this.fechar();
        }

      } else {
        this.carregando = false;
        SnackBarComponent.prototype.texto = "ERRO, CURSO NÃO FOI CRIADO"
        SnackBarComponent.prototype.tipo = 'error';
        this.openSnackBar('error');
      }
    })
  }
}
