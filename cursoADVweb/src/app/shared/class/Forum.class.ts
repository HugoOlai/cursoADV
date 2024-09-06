import { Arquivo } from "./Arquivo.class";
import { Usuario } from "./Usuario.class";
import { Resposta } from "./Video";

export interface Forum {
  usuario: Partial<Usuario>,
  titulo: string,
  conteudo: string,
  resposta?: string,
  arquivos?: Array<Arquivo>
  listaResposta?: Array<Resposta>;


}


