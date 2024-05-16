import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Curso } from '../../shared/class/Curso.class';

@Component({
  selector: 'app-contratacao',
  templateUrl: './contratacao.component.html',
  styleUrl: './contratacao.component.scss'
})
export class ContratacaoComponent {


  constructor(
    private activedRoute: ActivatedRoute,
  ) {}
  ngOnInit() {

    this.activedRoute.params
    .pipe(take(1))
    .subscribe(params => {
      try {
        console.log(params)

        if (params["curso"] != undefined) {
          let curso: Curso = params["curso"];
          console.log(curso)
        }

      } catch (error) {
        console.log(error)
      }
    });
  }

}
