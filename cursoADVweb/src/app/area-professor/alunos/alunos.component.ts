import { Component } from '@angular/core';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class alunosComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();

}
