import { Arquivo } from "./Arquivo.class";
import { Usuario } from "./Usuario.class";

export interface Forum {
  usuario: Usuario,
  titulo: string,
  conteudo: string,
  arquivos?: Array<Arquivo>

}


