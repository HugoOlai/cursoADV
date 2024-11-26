export interface Curso {
  id: string;
  dataLançamento: Date,
  dataContratacao?: Date,

  cupom?: string,
  titulo: string,
  link: string,
  objetivo: string,
  parcelas?: string,
  subtitulo: string,
  estrutura: string,
  tipoCurso: string,
  materialApoio: string,
  descricaoGeral?: string,
  valorFormatado?: string,
  idPagamentoAsaas?: string,
  valorComDesconto?: string,
  valorCupomFormatado?: string,
  dataLançamentoFormatada?: string,
  dataContratacaoFormatada?: string,

  src: null,
  video?: null,
  idImg: string,
  arquivo?: null,
  topcos: Array<string>,
  listaCupons?: Array<any>,
  listaVideos: Array<any>,
  listaArquivosApoio?: any,

  valor: number,
  valorCupom: number,

  status: boolean,
  statusPago: boolean,
  cursoContratado?: boolean,
}

