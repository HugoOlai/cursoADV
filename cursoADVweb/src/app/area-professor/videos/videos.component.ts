import { Component } from '@angular/core';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  carregando: boolean = false;
  isMobile = Util.isMobile();
}
