import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';

@Component({
  selector: 'app-foruns',
  templateUrl: './foruns.component.html',
  styleUrl: './foruns.component.scss'
})
export class ForunsComponent {
  isMobile = Util.isMobile();


  Adicionar(){

  }
}
