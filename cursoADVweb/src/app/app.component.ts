import { environment } from './environments';
import { RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Compiler, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { Util } from './class/util.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
    SnackBarComponent.prototype.horizontalPosition = 'right';
    SnackBarComponent.prototype.verticalPosition = 'top';


    this._compiler.clearCache();

    if(location.hash.includes('acesso') || location.hash.includes('areaAluno') || location.hash.includes('admin')){
      this.barBlog = false;
    }

    if (environment.production) {
      if (location.protocol === "http:") {
        window.location.href = location.href.replace("http", "https");
        environment.baseUrl = 'http://ec2-44-203-101-129.compute-1.amazonaws.com/api/'
      }
    }
  }

  defineBarraSideBar(){
    if(location.hash.includes('acesso') || location.hash.includes('areaAluno') || location.hash.includes('admin')){
      this.barBlog = false;
    } else {
      this.barBlog = true;
    }
    this.changeDetectorRef.detectChanges();
    // this.changeDetectorRef.detectChanges();
  }
}
