import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from '../environments';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, http2: HttpBackend) {
  }

  cadastrar(usuario: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/usuario/cadastrar`, usuario)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  atualizar(usuario: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/usuario/atualizar`, usuario)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  listaUsuarios(): Observable<any>{

    return this.http.get(`${environment.baseUrl}/usuario/ListaUsuarios`)
    .pipe(
      take(1),
      map(result => result)
    );

  }

  pegarUsuario() : Observable<any> {
    return this.http.get(`${environment.baseUrl}/usuario/pegarUsuario`)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  pegarUsuarioPorId(IdUsuario: string) : Observable<any> {
    return this.http.get(`${environment.baseUrl}/usuario/pegarPeloId/${IdUsuario}`)
      .pipe(
        take(1),
        map(result => result)
      );
  }
}
