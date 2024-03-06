import { Compiler, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cursoADVweb';

  constructor(private _compiler: Compiler, private auth: AuthService, private cookie : CookieService) {
    this.auth.getUserAsync().then((usuario: any) => {

      this.cookie.delete('nome');
      this.cookie.delete('email');

      if(usuario != null){
        this.cookie.set('nome', usuario.nome);
        this.cookie.set('email', usuario.email);
      }
    });
   }

   ngOnInit(): void {
    this._compiler.clearCache();

    if (environment.production) {
      if (location.protocol === "http:") {
        window.location.href = location.href.replace("http", "https");
      }
    }
  }
}
