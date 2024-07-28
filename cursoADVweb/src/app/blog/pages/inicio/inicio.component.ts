import { Component, OnInit } from '@angular/core';
import { Util } from '../../../class/util.class';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  vira = false;
  vira2 = false;
  vira3 = false;
  texto: string = 'Cursos elaborados por especialistas para transformá-lo em um profissional altamente qualificado para concursos de Defensoria Pública.';
  texto2: string = 'Técnicas de ensino avançadas que promovem uma aprendizagem profunda e prática, preparando você para os desafios reais dos concursos e da carreira jurídica.';
  texto3: string = ' Acompanhamento em grupo e acesso a uma rede de estudantes e profissionais engajados, fortalecendo sua preparação e motivação.';

  sumiritem = false;

  ListaAvaliacoes: Array<any> = [
    {
      nome: 'Luff D Monkey',
      estrelas:["","","","",""],
      conteudo:`Com a orientação focada e o suporte do
        grupo, consegui superar minhas
        dificuldades. Fui aprovada na segunda fase
        do concurso graças à metodologia e ao
        ambiente de apoio que encontrei aqui`,
     css:'pequeno',
     src:'https://img.freepik.com/fotos-gratis/designer-trabalhando-no-modelo-3d_23-2149371896.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710633600&semt=sph'
    },
    {
      nome: 'Ivankov Inperatris',
      estrelas:["","","","",""],
      conteudo:`Com a orientação focada e o suporte do
        grupo, consegui superar minhas
        dificuldades. Fui aprovada na segunda fase
        do concurso graças à metodologia e ao
        ambiente de apoio que encontrei aqui`,
     css:'grande',
     src:'https://valentinahair.com.br/web/wp-content/uploads/2022/05/DUDA-1B.jpg'
    },
    {
      nome: 'Bruno O Mestre',
      estrelas:["","","","",""],
      conteudo:`Com a orientação focada e o suporte do
        grupo, consegui superar minhas
        dificuldades. Fui aprovada na segunda fase
        do concurso graças à metodologia e ao
        ambiente de apoio que encontrei aqui`,
      css:'pequeno', src:'../../../../assets/imgs/a.png'
    },
  ]

  ListaBannersCursos: any = [
    {src: '../../../../assets/imgs/capaCursosEcaProInf.png'},
    {src: '../../../../assets/imgs/bannerrotativo1.png'},
  ]

  ListaBanners: any = [
    {src: '../../../../assets/imgs/bannerrotativo1.png'},
    {src: '../../../../assets/imgs/capaCursosEcaProInf.png'},
  ]

  caroucelBtns: string = '';
  carouselConteudo: string = '';
  isMobile = Util.isMobile();
  contador = 0;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.ListaBanners.forEach((banners: any) => {
      this.contador++
      this.caroucelBtns = `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${this.contador}" class="active" aria-current="true" aria-label="Slide ${this.contador}"></button>`
      this.caroucelBtns = `<div class="carousel-item active" data-bs-interval="10000">
      <img src="${banners.src}" class="d-block w-100" alt="...">
    </div>`
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    // console.log(changes)
  }

  virar(tipo: number){
    // console.log('passeo aqui')
    switch(tipo){
      case 1:
        this.vira = true;
      break;
      case 2:
      this.vira2 = true;

      break;
      default:
        this.vira3 = true;
    }
  }

  desVirar(tipo: number){
    // console.log('desVirar')
    // console.log(this.sumiritem)
    // this.vira = false;
    switch(tipo){
      case 1:
        this.vira = false;
      break;
      case 2:
      this.vira2 = false;

      break;
      default:
      this.vira3 = false;
    }

  }

  direita(){
    // console.log(this.ListaAvaliacoes)
    var lista:any = [];
    var cont = 0;
    var principal = false;
    this.ListaAvaliacoes.forEach((element:any) => {
      if(cont > 0){
        if(cont == 1){
          element.css = 'pequeno'
          lista.push(element);

        }else{
          if(!principal){
            element.css = 'grande'
            lista.push(element);
            principal = true;
          } else {
            lista.push(element);
          }
        }
      }
      cont++
    });

    lista.push(this.ListaAvaliacoes[0])
    this.ListaAvaliacoes = lista;
    // console.log(this.ListaAvaliacoes)

  }

  esquerda(){
    // console.log(this.ListaAvaliacoes)
    var lista:Array<any> = [];
    var cont = 0;

    this.ListaAvaliacoes.forEach(avaliacao => {
        // console.log(cont)

      if(cont == 0){
        avaliacao.css = 'grande'
        lista.push(avaliacao)
      }else if(cont == 1){
        avaliacao.css = 'pequeno'
        lista.push(avaliacao)
      }else{
        avaliacao.css = 'pequeno'
        lista.unshift(avaliacao)
      }
      cont++
    })

    this.ListaAvaliacoes = lista;
    // console.log(this.ListaAvaliacoes)

  }

}
