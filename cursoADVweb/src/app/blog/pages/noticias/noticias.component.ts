import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { Util } from '../../../class/util.class';
import { MatSort, Sort } from '@angular/material/sort';
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
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
  isMobile = Util.isMobile();
  listaSearch: Array<any> = [];

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  listaNoticias: Array<any> = [
    {
      titulo: 'O que diz a nova Lei Nº 14.826, de 20 de março de 2024',
      data: 'Sun Apr 07 2024 14:32:31 GMT-0300',
      conteudo:`Institui a parentalidade positiva e o direito ao brincar como estratégias
        intersetoriais de prevenção à violência contra crianças;`,
      src:'assets/imgs/site proinf quem somos e cursos/1.png'
    },
    {
      titulo: 'O que diz a nova Lei Nº 14.826, de 20 de março de 2024',
      data: 'Sun Apr 07 2024 14:32:31 GMT-0300',
      conteudo:`Institui a parentalidade positiva e o direito ao brincar como estratégias
        intersetoriais de prevenção à violência contra crianças;`,
      src:'assets/imgs/site proinf quem somos e cursos/2.png'
    },
    {
      titulo: 'O que diz a nova Lei Nº 14.826, de 20 de março de 2024',
      data: 'Sun Apr 07 2024 14:32:31 GMT-0300',
      conteudo:`Institui a parentalidade positiva e o direito ao brincar como estratégias
        intersetoriais de prevenção à violência contra crianças;`,
      src:'assets/imgs/site proinf quem somos e cursos/3.png'
    },
    {
      titulo: 'O que diz a nova Lei Nº 14.826, de 20 de março de 2024',
      data: 'Sun Apr 07 2024 14:32:31 GMT-0300',
      conteudo:`Institui a parentalidade positiva e o direito ao brincar como estratégias
        intersetoriais de prevenção à violência contra crianças;`,
      src:'assets/imgs/site proinf quem somos e cursos/4.png'
    },
    {
      titulo: 'O que diz a nova Lei Nº 14.826, de 20 de março de 2024',
      data: 'Sun Apr 07 2024 14:32:31 GMT-0300',
      conteudo:`Institui a parentalidade positiva e o direito ao brincar como estratégias
        intersetoriais de prevenção à violência contra crianças;`,
      src:'assets/imgs/site proinf quem somos e cursos/5.png'
    },
    {
      titulo: 'O que diz a nova Lei Nº 14.826, de 20 de março de 2024',
      data: 'Sun Apr 07 2024 14:32:31 GMT-0300',
      conteudo:`Institui a parentalidade positiva e o direito ao brincar como estratégias
        intersetoriais de prevenção à violência contra crianças;`,
      src:'assets/imgs/site proinf quem somos e cursos/6.png'
    },
  ]
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.listaNoticias.forEach(noticia => {
      noticia.dataFormatada =  Util.dataHoraFormatada(noticia.data)
    });

    this.init(this.listaNoticias.slice(0,4));
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
    let listaTable = this.listaNoticias.slice(startItem, endItem);

    this.init(listaTable);
  }

  init(listaTable: any[]) {
    this.listaSearch = [];

    listaTable = listaTable.slice(0, this.listaNoticias.length);

    this.mergeSort(listaTable, 0, listaTable.length);
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
}
