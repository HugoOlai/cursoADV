import { Component } from '@angular/core';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class tarefaComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();
}
