import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { ActionsTable, HeaderTable, OptionsTable } from '../../components/table/table.class';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class alunosComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();
  listaAlunos = [];

  header: HeaderTable[] = [
    {
      description: 'Número processo',
      key: 'numeroProcessoFormatado', order: false, class: 'text-left',
      selectAll: true,
      select: true
    },
    {
      description: 'Estado',
      key: 'uf',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    }
  ]

  options: OptionsTable = {
    select: true,
    selectAll: true,
    action: true,
    searchShow: false,
    lineSize: true,
    placeholder: '',
    captionShow: true,
    caption: 'Total de {@} processos',
    empty: 'Não existem processos para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    pageSize: 5,
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Processos por página',
    tdKeyList: ["numeroProcessoFormatado", 'statusFormatado'],

  };

  actions: ActionsTable[] = [
    {
      description: 'Vincular',
      icon: 'cached',
      isButton: true,
      class: 'btn btn-outline-success btn-sm rounded-pill icon-button-only',
      tooltip: '',
      classIcon: 'ft-16',
      placement: 'top',
      handle: (item: any) => { this.teste() }
    }
  ]

  constructor(

  ) { }

  ngOnInit(): void {

  }

  pegarSelecionados(){

  }
  teste(){

  }

}
