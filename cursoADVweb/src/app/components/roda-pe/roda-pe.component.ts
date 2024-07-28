import { Component } from '@angular/core';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-roda-pe',
  templateUrl: './roda-pe.component.html',
  styleUrl: './roda-pe.component.scss'
})
export class RodaPeComponent {
  isMobile = Util.isMobile()
}
