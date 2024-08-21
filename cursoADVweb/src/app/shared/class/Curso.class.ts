export interface Curso {
  id: string;
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
  idPagamentoAsaas: string,
  valorComDesconto: string,
  dataLançamentoFormatada: string,
  dataContratacaoFormatada: string,

  src: null,
  video: null,
  arquivo: null,
  topcos: Array<string>,
  listaVideos: Array<any>
  listaArquivosApoio: any,

  valor: number,

  status: boolean,
  statusPago: boolean,
  cursoContratado: boolean,
}

