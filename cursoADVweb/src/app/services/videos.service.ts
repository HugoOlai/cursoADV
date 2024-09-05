import { Injectable } from '@angular/core';
import { Observable, map, take} from 'rxjs';
import { environment } from '../environments';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  cursoEscolhido: any;

  constructor(private http: HttpClient, http2: HttpBackend) {
  }

  cadastrar(video: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/video/cadastrar`, video)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  cadastrarPergunta(pergunta: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/video/cadastrarPergunta`, pergunta)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  editar(video: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/video/editar`, video)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  deletar(video: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/video/deletar`, video)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegarTodos() : Observable<any> {
    return this.http.get(`${environment.baseUrl}/video/pegarTodos`)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegarPerguntas() : Observable<any> {
    return this.http.get(`${environment.baseUrl}/video/pegarPerguntas`)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegarPeloId(IdVideo: string) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/video/pegarPeloId/${IdVideo}`)
      .pipe(
        take(1),
        map(result => result)
      );
  }
}
