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

