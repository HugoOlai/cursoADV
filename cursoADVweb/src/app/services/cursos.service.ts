import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from '../environments';
import { Curso } from '../shared/class/Curso.class';
import { HttpBackend, HttpClient } from '@angular/common/http';

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
