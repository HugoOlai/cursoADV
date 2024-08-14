export interface Curso {
  id: string;
  idPagamentoAsaas: string,
  dataLançamento: Date,
  dataContratacao: Date,

  titulo: string,
  objetivo: string,
  parcelas: string,
  subtitulo: string,
  estrutura: string,
  tipoCurso: string,
  materialApoio: string,
  descricaoGeral: string,
  valorFormatado: string,
  valorComDesconto: string
  dataLançamentoFormatada: string,
  dataContratacaoFormatada: string,

  src: null,
  video: null,
  arquivo: null,
  listaVideos: Array<any>
  listaArquivosApoio: any,
  topcos: Array<string>,
  valor: number,
  statusPago: boolean,
  cursoContratado: boolean,
}

