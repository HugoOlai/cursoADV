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
import { ActionsTable, HeaderTable, OptionsTable } from '../../../components/table/table.class';

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
  carregandoArquivos = true;
  criarCurso = false;
  imgCurso: any;
  formularioCurso: FormGroup;
  isMobile = Util.isMobile();

  dataLancamento: any;
  tipoSelecionado: any;
  statusSelecionado: any;
  imagemSelecionada: any;

  topicos: Array<String> = [];
  listaCupons: Array<any> = [];
  imagensACarregar?: Array<Arquivo>;
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

  header: HeaderTable[] = [
    {
      description: 'Cupom',
      key: 'cupom', order: false, class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Valor Cupom',
      key: 'valorCupomFormatado',
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
    caption: 'Total de {@} cupons',
    empty: 'Não existem cupons para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    pageSize: 5,
    handle: ()=>{},
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Cupons por página',

  };

  actions: ActionsTable[] = [
    {
      description: 'Deletar',
      icon: 'edit',
      isButton: true,
      class: 'btn btn-primary btn-sm rounded-pill icon-button-only',
      tooltip: '',
      classIcon: 'ft-14',
      placement: 'top',
      handle: (item: any) => { this.deletarCupom(item) }
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
      Link: [data.curso.link],
      Tipo: [data.curso.tipoCurso == null? "CURSO" : data.curso.tipoCurso],
      Status: [data.curso.status == null || data.curso.status == false? "INATIVO" : "ATIVO"],
      Subtitulo: [data.curso.subtitulo],
      DataLancamento: [data.curso.dataLançamentoFormatada],
      Estrutura: [data.curso.estrutura],
      MaterialApoio: [data.curso.materialApoio],
      Objetivo: [data.curso.objetivo],
      Topico: [null],
      Cupom: [data.curso.cupom],
      ValorCupom: [data.curso.valorCupom == null? "" : data.curso.valorCupom.toString()],
      ValorCupomFormatado: [Util.formataValor(data.curso.valorCupom).toString()],
      Valor: [data.curso.valor.toString()],
      ValorFormatado: [Util.formataValor(data.curso.valor).toString()],
    })
  }

  ngOnInit(): void {
    this.criarCurso = Util.isNullOrEmpty(this.data.curso.id)? true : false;
    this.dataLancamento = this.formularioCurso.get('DataLancamento');
    this.dataLancamento.disable();
    if(!this.criarCurso){
      if(this.data.curso.topcos != null)
        this.topicos = [...this.data.curso.topcos]

      if(this.data.curso.listaCupons != null)
        this.listaCupons = this.data.curso.listaCupons

      this.carregando = true;
      this.arquivosService.pegarArquivo(this.data.curso.idImg).subscribe(res=>{
        if(res != null){
          this.data.curso.src = res.base64;
          this.data.curso.idImg = res.id;
        }

        this.carregando = false;
      }, err=>{
        this.carregando = false;

      });

      if(this.data.curso.listaArquivosApoio != null)
        this.listaArquivosApoio = [...this.data.curso.listaArquivosApoio]

      this.carregandoArquivos = true;
      this.arquivosService.pegarArquivos(this.data.curso.id).subscribe(res=>{
        res.forEach((arquivo: any) => {
          this.listaArquivosApoio.push(arquivo);
        });

        this.carregandoArquivos = false;
      })
    } else {
      this.carregandoArquivos = false;

    }

  }

  adicionarCupom(){
    var form = this.formularioCurso.value;
    this.carregando = true;

    var index = this.listaCupons.length > 0? this.listaCupons.length + 1 : this.listaCupons.length;
    if(this.listaCupons.length > 0)
      index ++


    var obj = {
      index: index,
      cupom: form.Cupom,
      valorCupomFormatado: form.ValorCupomFormatado,
      valorCupom: form.ValorCupomFormatado.replace("R$", '').replace(",",".").trim(),
    }

    if(this.listaCupons.length == 0)
      index ++

    this.listaCupons.push(obj);

    setTimeout(() => {
      this.carregando = false;

    }, 1000);

  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  deletarCupom(cupom: any){
    this.carregando = true;

    var lista = this.listaCupons.filter(c => c.index != cupom.index)
    this.listaCupons = lista;

    setTimeout(() => {
      this.carregando = false;

    }, 1000);
  }

  formataValorCupom(){
    var form = this.formularioCurso.value;
    // console.log(form.ValorFormatado.replace("R$", '').replace(",",".").trim())
    form.ValorCupomFormatado = form.ValorCupomFormatado.replace("R$", '').replace(",",".").trim()
    this.formularioCurso.get('ValorCupomFormatado')?.setValue(Util.formataValor(form.ValorCupomFormatado))
    this.formularioCurso.get('ValorCupom')?.setValue(form.ValorCupomFormatado)
  }

  formataValor(){
    var form = this.formularioCurso.value;
    // console.log(form.ValorFormatado.replace("R$", '').replace(",",".").trim())
    form.ValorFormatado = form.ValorFormatado.replace("R$", '').replace(",",".").trim()
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
    this.arquivosService.pegarArquivo(arquivo.id).subscribe(arq => {
      var linkSource = arq.base64;
      const downloadLink = document.createElement('a');
      const fileName = `${arquivo.nome}`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    });

  }

  fechar(atualiza: boolean = false){
    this.dialogRef.close({data: atualiza});
  }

  salvar(){
    var form = this.formularioCurso.value;
    form.id = this.data.curso.id;
    form.idImg = this.data.curso.idImg;
    form.topcos = this.topicos;
    form.tipoCurso = form.Tipo
    form.Status = form.Status == 'INATIVO'? false : true;
    form.src = this.data.curso.src;
    form.listaCupons = this.listaCupons;

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
        this.fechar(true);
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
          this.fechar(true);

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
