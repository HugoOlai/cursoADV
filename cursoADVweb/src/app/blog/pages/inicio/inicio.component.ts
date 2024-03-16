import { Component, OnInit } from '@angular/core';
import { Util } from '../../../class/util.class';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  ListaBanners: any = [
    {src: '../../../../assets/imgs/capaCursosEcaProInf.png'},
    {src: '../../../../assets/imgs/bannerrotativo1.png'},
  ]

  caroucelBtns: string = '';
  carouselConteudo: string = '';
  isMobile = Util.isMobile();
  contador = 0;
  constructor() { }

  ngOnInit() {
    this.ListaBanners.forEach((banners: any) => {
      this.contador++
      this.caroucelBtns = `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${this.contador}" class="active" aria-current="true" aria-label="Slide ${this.contador}"></button>`
      this.caroucelBtns = `<div class="carousel-item active" data-bs-interval="10000">
      <img src="${banners.src}" class="d-block w-100" alt="...">
    </div>`
    });
  }

}
