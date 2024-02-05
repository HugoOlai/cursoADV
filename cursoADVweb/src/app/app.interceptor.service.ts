import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from './environments';
import { Injectable } from '@angular/core';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";
  private token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MDY2NjE2MDUsImV4cCI6MTcwNjY2NTIwNSwiaWF0IjoxNzA2NjYxNjA1LCJpc3MiOiJMb2dpbklzc3VlciIsImF1ZCI6IkxvZ2luQXVkaWVuY2UifQ.KB6HGb74Sjd_Ci1UgmHjSGB7wuGl5PeArqixgrdvZ2Qt2Lp8JHM05UTU-LBKG48GUSXQS_ykyOnxIhVdUILNE5kjypruuuE3genI0wI-2uuOK5J7hTADWM2pKYa2jvg-A5yCdi5ltRE_yeVboiQpZ9scz_7akkMvuV5qa8QFoY7nV8SwXO54l9L6AnkoC2mQsE4gSn0MJFCah_5cEmUx1Fxb0nIKCUBBGdpMSn6C7MRdbfWhJMLVqblcttee_wRCbpmEvYeCRZKdGjYxER2UMuEQCynyQoZwplOUOjHAgA0cbNABkuxI2JLCHFo2Q_Xu9c9Knb3X00oiMHlakyW_Ow";

  constructor( public auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('passei aqui ')
    req = req.clone({
      headers: req.headers
        .set("Content-Type", "application/json")
        .set("Access-Control-Allow-Origin", "*")
        .set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
        .set("Cross-Origin-Opener-Policy-Report-Only","same-origin-allow-popups")
        .set("same-origin", "same-origin-allow-popups")
        .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        .set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    });

    console.log(req)
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('Sucesso:',event)

      },
        (err: any) => {
          console.log('Erro: :',err)
        }
      )
    );
  };

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    this.token = this.auth.getToken();

    console.log(this.token)
    // let objUsuario: any = {
    //   Email: '@teste',
    //   Sistema: 3,
    //   AccessKey: environment.key
    // }

    // this.auth.autenticar(objUsuario).subscribe({
    //   next: (res)=>{
    //     console.log('Sucesso final',res)
    //   },
    //   error: (err)=>{
    //     console.log('Erro final',err)
    //   }
    // })

    if (!this.token) return request;
    if (!request.url.match(environment.baseUrl)) return request;

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
