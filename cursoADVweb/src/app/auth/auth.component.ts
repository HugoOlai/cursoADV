import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { take } from "rxjs";
import { environment } from "../environments";


export class AuthModel {
  Cpf: string = '';
  Id: string = '';
  Rota: string = '';
  NumeroProcesso?: string;
  Tipo?: string;
  Qtd?: number;
  Data?: string;
  DataFim?: string;
}

@Component({
  selector: "app-auth",
  template: ""
})

export class AuthComponent implements OnInit {

  private ip: string = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private service: AuthService
  ) {
    this.service.getIpAddress().subscribe((res: any) => {
      if (res["ip"]) this.ip = res["ip"];
    }, err => {});
  }

  ngOnInit() {
    this.activedRoute.params
    .pipe(take(1))
    .subscribe(params => {
      try {
        if (params["hash"] != undefined) {

          let _hash: any = params["hash"];
          let temp: any = _hash;

          for (let x = 0; x < 3; x++) {
            temp = ''//atob(temp);
          }
          let last = JSON.parse(temp);
          let decrypt: AuthModel = last;

          // if ( decrypt != undefined ||
          //   (decrypt.Cpf != undefined && decrypt.Rota != undefined && decrypt.Id != undefined))

          this.autenticar(decrypt);

        }

      } catch (error) {
        console.log(error)
      }
    });

  }

  autenticar(decrypt: any) {
    console.log(decrypt)
    let user: any = {
      Cpf: decrypt.Cpf,
      Senha: environment.access,
      TipoEmail: decrypt.Tipo,
      Sistema: 2,
      AccessKey: environment.key,
      ip: this.ip
    };

    this.service.autenticar(user).subscribe({
      next: (res: any)=>{
      console.log(res)
      this.service.setToken(res.accessToken);

    },
      error:(err) =>{
        console.log(err)

      }
    })
  }
}
