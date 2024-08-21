import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {
  cursoEscolhido: any;

  constructor(private http: HttpClient, http2: HttpBackend) {
  }

  pegarArquivos(idCurso: string) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/Arquivos/PegarArquivos`, {idCurso: idCurso})
      .pipe(
        take(1),
        map(result => result)
      );
  }


}
