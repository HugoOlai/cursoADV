// import { Injectable } from "@angular/core";
// import { PageChangedEvent } from "ngx-bootstrap/pagination";

// @Injectable({
//   providedIn: "root"
// })
// export class TableService {
//   pageChanged(event: PageChangedEvent, lista: any[], pageSize: number): any {
//     const startItem = (event.page - 1) * pageSize;
//     const endItem = event.page * pageSize;
//     return lista.slice(startItem, endItem);
//   }

//   pageItensChanged(lista: any[], pageSize: number, paginaAtual: number): any {
//     const startItem = (paginaAtual - 1) * pageSize;
//     const endItem = paginaAtual * pageSize;
//     return lista.slice(startItem, endItem);
//   }

//   getKey(obj: any, param: any) {
//     return Object.keys(obj[param]);
//   }

//   getValue(item: any, param: number): any {
//     return Object.values(item)[param];
//   }

//   order(lista: any[], fieldName: string, asc: boolean) {
//     let _func = !asc
//       ? (a: any, b: any) =>
//           a[fieldName] < b[fieldName] ? 1 : b[fieldName] < a[fieldName] ? -1 : 0
//       : (a: any, b: any) =>
//           a[fieldName] > b[fieldName]
//             ? 1
//             : b[fieldName] > a[fieldName]
//             ? -1
//             : 0;

//     lista.sort(_func);
//   }

//   filter(value: any, lista: any[], header: any[]): any[] {
//     if (!value || value == "") return lista;

//     var t = lista.filter((item: any) => {
//       let has = false;

//       header.forEach(head => {
//         if (item.hasOwnProperty(head.key) && item[head.key] && item[head.key].toLowerCase().includes(value.toLowerCase())){
//           has = true;
//         }
//       });

//       // for (const key in item) {
//       //   if (item.hasOwnProperty(key) && item[key] && item[key].toLowerCase().includes(value.toLowerCase())){
//       //     has = true;
//       //     break;
//       //   }
//       // }
//       if (has) return item;
//     });
//     return t;
//   }
// }
