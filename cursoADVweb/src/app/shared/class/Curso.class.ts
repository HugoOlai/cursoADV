export interface Curso {
  id: string;
  idPagamentoAsaas: string,
  dataLançamento: Date,
  titulo: string,
  objetivo: string,
  parcelas: string,
  subtitulo: string,
  estrutura: string,
  materialApoio: string,
  valorFormatado: string,
  valorComDesconto: string
  video: null,
  arquivo: null,
  listaVideos: Array<any>
  listaArquivosApoio: any,
  topcos: Array<string>,
  src: null,
  valor: number,
  statusPago: boolean,
  cursoContratado: boolean,
  tipoCurso: string,
  descricaoGeral: string,
}

