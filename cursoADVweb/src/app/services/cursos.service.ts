import { Injectable } from '@angular/core';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { environment } from '../environments';
import { Curso } from '../shared/class/Curso.class';
import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursoEscolhido: any;

  constructor(private http: HttpClient, http2: HttpBackend) {
  }

  get(){
    return this.cursoEscolhido
  }

  set(curso: Curso){
    this.cursoEscolhido = curso;
  }

  cadastrar(curso: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/curso/cadastrar`, curso)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegar(curso: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/curso/pegar`, curso)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegarTodos() : Observable<any> {
    return this.http.get(`${environment.baseUrl}/curso/pegarTodos`)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  conferirCobranca(idPagamentoAsaas: string) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/curso/conferirCobranca/${idPagamentoAsaas}`)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  getIpCliente() : Observable<any> {
    return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
              .pipe(
                take(1),
                map(res => res)
              );
  }

  contratarCurso(curso: any, usuario: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/curso/contratar`, {curso: curso, usuario: usuario})
      .pipe(
        take(1),
        map(result => result)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
