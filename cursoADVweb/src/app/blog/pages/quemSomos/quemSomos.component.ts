import { Component, OnInit } from '@angular/core';
import { Util } from '../../../class/util.class';

@Component({
  selector: 'app-quemSomos',
  templateUrl: './quemSomos.component.html',
  styleUrls: ['./quemSomos.component.scss']
})
export class QuemSomosComponent implements OnInit {
  isMobile = Util.isMobile();
  constructor() { }

  ngOnInit() {
  }

}
