
export interface Usuario {
  id?: string;
  nome: string,
  cargo: string,
  email: string,
  telefone: string,
  cpfCnpj: string,
  listaCursos?: Array<any>,
  src: any,
  endereco: any;
  cartao: any;
}

