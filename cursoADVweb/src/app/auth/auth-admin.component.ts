import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-authadmin",
  template: ""
})
export class AuthAdminComponent implements OnInit {
  private url: string = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private service: AuthService,
    private cookie : CookieService
  ) {}

  ngOnInit() {

    this.activedRoute.params
    .pipe(take(1))
    .subscribe(params => {
      try {

        if (params["hash"] != undefined) {
          let hash: any = params["hash"];
          this.admin(hash);
        }
        else this.goLogin();

      } catch (error) {
        this.goLogin();
      }
    });
  }

  goLogin = () => this.router.navigateByUrl("/acesso/login");


  admin(hash: any) {
    try {
      let param: any = ''//atob(hash);

      //Verificar email ou cpf
      if (param.indexOf("@") > -1) {
        let email: string = JSON.parse(param);
        console.log(email)
        // if (!Util.isNullOrEmpty(email)) this.logar(email);
        // else
        //Toast.init("warning", "", msg.ERROR_500, true).then(() => this.goLogin());
      }
      else {
        let CPF: string = JSON.parse(param);
        console.log(CPF)
        // if (!Util.isNullOrEmpty(CPF)) this.logar(CPF);
        // else
        // Toast.init("warning", "", msg.ERROR_500, true).then(() => this.goLogin());
      }
    } catch (error) {
      console.log(error)
      // Toast.init("warning", "", msg.ERROR_500, true).then(() => this.goLogin());
    }
  }

  logar(CPF: string) {
  }

}
