import { Editor, Toolbar } from 'ngx-editor';
import { Util } from '../../../class/util.class';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Forum } from '../../../shared/class/Forum.class';
import { Arquivo } from '../../../shared/class/Arquivo.class';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

const portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

@Component({
  selector: 'app-foruns',
  templateUrl: './foruns.component.html',
  styleUrl: './foruns.component.scss'
})
export class ForunsComponent {
  isMobile = Util.isMobile();
  formulario: FormGroup;
  imagemSelecionada: any;
  campoSelecionado: string = '';

  selecionarEmoji = false;
  formData = new FormData();
  imagensACarregar?: Array<Arquivo>;
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  usuarioLogado = {
    nome: 'Ana Júlia da Silva',
    cargo: 'Estagiária na DPE-SP',
    src: 'https://opresenterural.com.br/wp-content/uploads/2019/03/Biogenesis-mulher.jpg',
    email: '',
    telefone:'',
    cpfCnpj:'',

  }

  listaSearch: Array<Forum> = [];

  listaForuns: Array<Forum> = [{
    usuario: this.usuarioLogado,
    titulo: 'Como eu consigo reconhecer a peça processual da questão?',
    conteudo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.
    `,
  }]

  // editor: Editor = new Editor({
  //   content: '',
  //   plugins: [],
  //   nodeViews: {},
  //   history: true,
  //   keyboardShortcuts: true,
  //   inputRules: true,
  // });

  // html = '';

  // toolbar: Toolbar = [
  //   // default value
  //   ['bold', 'italic'],
  //   ['underline', 'strike'],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   // or, set options for link:
  //   //[{ link: { showOpenInNewTab: false } }, 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  //   ['horizontal_rule', 'format_clear'],
  // ];
  // colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];


  constructor(
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      Titulo: [null],
      Conteudo: [null],})
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      Titulo: [null],
      Conteudo: [''],
    });

    this.pegarForuns()

  }

  ngAfterViewInit() {

    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.previousPageLabel = 'Voltar página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.getRangeLabel = portugueseRangeLabel;
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

  pegarForuns(){
    this.listaSearch = this.listaForuns
  }

  irParapublicacao() {
    console.log('irParapublicacao')
  }

  upload(event: any) {
    const keys = Object.keys(event.target.files);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      if(event.target != null)
        this.imagemSelecionada = event.target.result;
    }

    this.imagensACarregar = keys.map((key: any) => {
      if (key !== 'length') {
        return event.target.files[key];
      }
    });

    if(this.imagensACarregar.length > 0) {
      event.target.value = '';
      // this.imagensACarregar.forEach(file => this.formData.append('file', file, file.name));
      // this.service
      // .salvarArquivos(this.pasta.id, formData)
      // .subscribe(
      //   (res: any) => {})
    }
  }

  addEmoji(emoji: any){
    // this.formulario.get('Conteudo').setValue(emoji.emoji.native);
    var montarConteudo = this.formulario.controls[this.campoSelecionado].value + " " + emoji.emoji.native

    this.formulario.controls[this.campoSelecionado].setValue(montarConteudo)

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
        usuario: this.usuarioLogado,
        titulo: this.formulario.controls['Titulo'].value,
        conteudo: this.formulario.controls['Conteudo'].value,
      }

      if(this.imagensACarregar != undefined || this.imagensACarregar != null)
        obj.arquivos = [...this.imagensACarregar]

      this.listaForuns.unshift(obj);
      this.listaSearch = [];
      this.mergeSort(this.listaForuns, 0, this.listaForuns.length);

      this.formulario.controls['Titulo'].setValue('')
      this.formulario.controls['Conteudo'].setValue('')

    }

  }
}
