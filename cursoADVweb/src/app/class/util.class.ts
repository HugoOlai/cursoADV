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

}
