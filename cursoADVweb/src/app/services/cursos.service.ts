import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from '../environments';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient, http2: HttpBackend) {
  }

  cadastrar(curso: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/curso/cadastrar`, curso)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegar(curso: any) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/curso/pegar`, curso)
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
}
