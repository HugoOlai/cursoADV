import { Component } from '@angular/core';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class noticiasComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();
}
