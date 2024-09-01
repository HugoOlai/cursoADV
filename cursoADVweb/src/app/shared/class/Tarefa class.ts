export interface Tarefa {
  id: string;
  dataLancamento: Date,
  idVideo: string,

  nome: string,
  nomeVideo?: string;
  descricao: string,
  dataLancamentoFormatada?: string,
}

