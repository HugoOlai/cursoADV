
export interface Usuario {
  id?: string;
  nome: string,
  cargo: string,
  email: string,
  telefone: string,
  cpfCnpj: string,
  listaCursos?: Array<any>,
  src: any,
  endereco: endereco;
  cartao: cartao;
  tipo: string;
}

interface endereco {
  cep: string,
  numero: string,
  rua: string,
  complemento: string,
}

interface cartao {
  id: string,
  nomeCartao: string,
  numeroCartao: string,
  mesExpira: string,
  anoExpira: string,
  creditCardBrand: string,
  creditCardNumber: string,
  creditCardToken: string,

}
