export interface Video {
  id: string;
  dataLancamento: Date,
  idCurso: string,

  nome: string,
  nomeArquivo: string,
  descricao: string,
  dataLancamentoFormatada?: string,
  listaIdsArquivos: Array<any>;
}

export interface Pergunta{
  id: string;
  idVideo: string;
  nomeVideo: string;
  nomeUsuario: string;
  idUsuario: string;
  listaResposta: Array<Resposta>;
  titulo: string;
  conteudo: string;
  resposta: string;
}

export interface Resposta{
  nome: string;
  resposta: string;
  tipo: number;
}
