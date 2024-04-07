import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { Observable, catchError, map, take, throwError, timeout } from 'rxjs';
import { HttpBackend, HttpClient, HttpErrorResponse} from '@angular/common/http';


interface Auth {
  // cpf?: string
  email?: string
  senha: string
  // sistema: string
  // tipoEmail?: string
  accessKey: string
  ip: string

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpBackend: HttpClient;

  constructor(private http: HttpClient, http2: HttpBackend) {
    this.httpBackend = new HttpClient(http2);
  }

  autenticar(user: Auth) : Observable<any> {
    // console.log('autenticar')
    return this.http.post(`${environment.baseUrl}/Autenticador`, user)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  async getUserAsync() {
    // console.log('getUserAsync')
    return await this.getUser();
  }

  getIpAddress() {
    return this.httpBackend
      .get("https://api.ipify.org/?format=json")
      .pipe(timeout(3000))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) { } else { }
    return throwError("Something bad happened; please try again later.");
  }

  getUser(): any {
    return this.tyParse("user");
  }

  setToken(accessToken: any) {
    return localStorage.setItem("token", btoa(JSON.stringify(accessToken)));
  }

  exluirToken(){
    // return localStorage.removeItem(KEY)
  }

  possuiToken(){
    return !!this.getToken()
  }

  getToken(): string {
    // return JSON.parse(atob(localStorage.getItem("token") || '{}'));
    return ''
  }

  tyParse(param: any) {
    var obj: any;
    try {
      // obj = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem(param) || '{}'))));
      return obj;

    } catch (error) {

      obj = JSON.parse(localStorage.getItem(param) || '{}');
      localStorage.setItem(param, btoa(JSON.stringify(obj)));
      return obj;
    }
  }
}
