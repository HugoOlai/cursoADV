import { Injectable } from '@angular/core';
import { Observable, map, take} from 'rxjs';
import { environment } from '../environments';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  cursoEscolhido: any;

  constructor(private http: HttpClient, http2: HttpBackend) {
  }

  cadastrar(tarefa: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/tarefa/cadastrar`, tarefa)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  editar(tarefa: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/tarefa/editar`, tarefa)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  deletar(tarefa: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/tarefa/deletar`, tarefa)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegarTodos() : Observable<any> {
    return this.http.get(`${environment.baseUrl}/tarefa/pegarTodos`)
      .pipe(
        take(1),
        map(result => result)
      );
  }

}
