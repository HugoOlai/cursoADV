import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';

const environment = {
  production: false,
  baseUrl : 'http://localhost:10423/api',
  //baseUrl: "https://172.16.16.15/api", //HOMOLOGACAO NOVA LINUX
  checkoutUrl : 'http://localhost:4200/#/admin/plano?callback=true',
  key : '202dacd275cec7cd77cbd1923e16b5d0',
  access : '@@71XX',
  // appVersion: require('../../package.json').version + '-dev',
};

export class appInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";
  private token = "secrettoken";

  constructor(
    //public auth: AuthService,
    //private router: Router
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers
        .set("Content-Type", "application/json")
        .set("Access-Control-Allow-Origin", "*")
        .set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
        .set("Cross-Origin-Opener-Policy-Report-Only","same-origin-allow-popups")
        .set("same-origin", "same-origin-allow-popups")
        .set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
        .set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    });
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('Sucesso:',event)

      },
        (err: any) => {
          console.log('Erro: :',err)
        }
      )
    );;
  };

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    this.token = 'teste'//this.auth.getToken();
    if (!this.token) return request;
    if (!request.url.match(environment.baseUrl)) return request;

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
