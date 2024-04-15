import { environment } from './environments';
import { RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Compiler, Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cursoADVweb';
  barBlog = true;

  constructor(private _compiler: Compiler,
    private auth: AuthService,
    private cookie: CookieService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
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

    console.log(location)

    if(location.hash.includes('acesso')){
      this.barBlog = false;
    }
    if (environment.production) {
      if (location.protocol === "http:") {
        window.location.href = location.href.replace("http", "https");
      }
    }
  }

  defineBarraSideBar(ativa: boolean){
    console.log(ativa)
    this.barBlog = ativa;
    // this.changeDetectorRef.detectChanges();
  }
}
