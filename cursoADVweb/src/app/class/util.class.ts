
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

  static emailMask(email: string) {
    var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
    var previous	= "";
    for(var i=0;i<maskedEmail.length;i++){
      if (i<=1 || previous == "." || previous == "@"){
        maskedEmail[i] = email[i];
      }
      previous = email[i];
    }

    console.log(maskedEmail)
    return maskedEmail.join('');
  }

  static validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
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

  static dataFormatada(novaData: string){
    var data = typeof(novaData) == 'object' ? novaData : new Date(novaData),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }



  }
