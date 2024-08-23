
// import moment from 'moment';
// import { defineLocale } from "ngx-bootstrap/chronos";
// import { ptBrLocale } from "ngx-bootstrap/locale";


export class Util {

  static isMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth <= 767) return true;
    if (/IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent) || window.innerWidth <= 767) return true;
    if (/Chrome/i.test(navigator.userAgent)) return false;
    return false;
  }

  static formataValor = (str: any) => {
    return Number(str).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  static isNullOrEmpty = (str: string) => {
    return str == undefined || str == null || str == "" || str.trim() == "";
    // if(typeof(str) == typeof('')){
    // } else {
    //   return str == undefined || str == null;
    // }
  }

  static isObjectNullOrEmpty = (obj: object) => {
    if (obj !== null && obj !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  static limparNumero = (str: string) => {
    if (!str || str.trim() == "") return "";
    return str.replace(/\D/g, "");
  }

  static formatarCartao = (numeroCartao: string) => {
    let regex = new RegExp(/^5[1-5][0-9]{14}/);

    if (!numeroCartao || numeroCartao.trim() == "") return {numeroCartao: numeroCartao, validaNumeroCartao: false};


    numeroCartao = this.limparNumero(numeroCartao)
    var validaNumeroCartao = regex.test(numeroCartao);
    numeroCartao = numeroCartao
    .substring(0, 16)
    .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/gi, "$1 $2 $3 $4");


    return {numeroCartao: numeroCartao, validaNumeroCartao: validaNumeroCartao};
  }

  static formataCpfCpjs(cpfCnpj: string){
    let regex = new RegExp(/(\d{3}).(\d{3}).(\d{3})-(\d{2})/);
    var validaCPF;
    cpfCnpj = cpfCnpj.includes('.')? cpfCnpj.replace(/./g,'') : cpfCnpj;
    cpfCnpj = cpfCnpj.includes('/')? cpfCnpj.replace(/\//g,'') : cpfCnpj;
    cpfCnpj = cpfCnpj.includes('-')? cpfCnpj.replace(/-/g,'') : cpfCnpj;
    // console.log(cpfCnpj)
    // console.log(cpfCnpj.length)

    if(cpfCnpj.length < 14){
      cpfCnpj = cpfCnpj.substring(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      validaCPF = regex.test(cpfCnpj);

    } else{
      cpfCnpj = cpfCnpj.substring(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      regex = new RegExp(/(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})/);
      validaCPF = regex.test(cpfCnpj);

    }

    return {cpfCnpj: cpfCnpj, validaCPF:validaCPF}
  }

  static emailMask(email: string) {
    var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
    var previous	= "";
    for(var i=0;i<maskedEmail.length;i++){
      if (i<=1 || previous == "." || previous == "@"){
        maskedEmail[i] = email[i];
      }
      previous = email[i];
    }

    return maskedEmail.join('');
  }

  static validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  static formataTelefone(tel: string){
    let regex = new RegExp(/\(\d{2}\)\s\d{5}-\d{4}/);
    var validaTelefone;
    var telefone: string = tel.trim();

    telefone = telefone.includes('(')? telefone.replace('(','') : telefone;
    telefone = telefone.includes(')')? telefone.replace(')','') : telefone;
    telefone = telefone.includes('-')? telefone.replace('-','') : telefone;
    telefone = telefone.includes('+')? telefone.replace('+','') : telefone;
    var teste = telefone.split(' ');
    telefone = teste.join('')

    if(telefone.length < 13){
      telefone = telefone.substring(0, 11).replace(/(\d{2})(\d)/,"($1) $2");
      telefone = telefone.replace(/(\d)(\d{4})$/,"$1-$2");
      validaTelefone = regex.test(telefone);

    } else {
      telefone = telefone.substring(0, 15).replace(/(\d{2})(\d{2})(\d)/, '+$1 ($2) ');
      telefone = telefone.replace(/(\d)(\d{4})$/,"$1-$2");
      regex = new RegExp(/\+\d{2}\s\(\d{2}\)\s\d{5,5}-?\d{4}/)
      validaTelefone = regex.test(telefone);
    }

    return {telefone:telefone, validaTelefone:validaTelefone}

  }

  static dataHoraFormatada(novaData: string){
    // var mesDia = novaData.split('/');
    // var anoHora = mesDia.length < 3? null : mesDia[2].split(' ');
    // var novaString = anoHora == null? null : anoHora[0]+'/'+mesDia[1]+'/'+mesDia[0]+' '+anoHora[1];

    var data = new Date(novaData),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(),
        hora  = data.getHours().toString(),
        horaF = (hora.length == 1) ? '0'+hora : hora,
        min  = data.getMinutes().toString(),
        minF = (min.length == 1) ? '0'+min : min;
    return diaF+"/"+mesF+"/"+anoF+" | "+horaF+":"+minF+"h";
  }

  static dataFormatada(novaData: string | Date){
    var data = typeof(novaData) == 'object' ? novaData : new Date(novaData),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }



  }
