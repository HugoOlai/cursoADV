import { Component } from '@angular/core';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class cursosComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();
}
