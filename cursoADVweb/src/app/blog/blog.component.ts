import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../class/util.class';
interface Menu {
  Nome: string;
  Link: string;
  Ativo: boolean;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  menuAnteriroSelecionado: string = 'Início';
  isMobile = Util.isMobile();
  barBlog = true;
  menu: Array<Menu> = [
    {
      Nome: 'Início',
      Link: '#blog/inicio',
      Ativo: true
    },
    {
      Nome: 'Quem Somos',
      Link: '#blog/quemSomos',
      Ativo: true
    },
    {
      Nome: 'Cursos',
      Link: '#blog/cursos',
      Ativo: false
    },
    // {
    //   Nome: 'Notícias',
    //   Link: '#blog/noticias',
    //   Ativo: false
    // },
    // {
    //   Nome: 'Fóruns',
    //   Link: '#blog/foruns',
    //   Ativo: false
    // },
    // {
    //   Nome: 'Fale Conosco',
    //   Link: '#blog/faleConosco',
    //   Ativo: false
    // }
  ];

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
    // if(location.hash.includes('acesso') || location.hash.includes('areaAluno') || location.hash.includes('admin')){
    this.menu.map((menu: Menu) => {if(menu.Link == location.hash) menu.Ativo = true; else menu.Ativo = false; return menu} )

  }

  redirecionarLogin() {
    location.assign('#/acesso/login')
    window.location.reload();
  }

  ngAfterViewInit(): void {
    // (document.getElementById('Início') as HTMLButtonElement).style.borderBottom = 'thick solid #ed8f00';
    // (document.getElementById('Início') as HTMLButtonElement).style.fontWeight = '900';

    this.menu.forEach(menu => {
      if(location.hash.includes(menu.Link.substring(1))) {
        menu.Ativo = true;
        this.menuAnteriroSelecionado = menu.Nome;
        (document.getElementById(menu.Nome) as HTMLButtonElement).style.borderBottom = 'thick solid #ed8f00';
        (document.getElementById(menu.Nome) as HTMLButtonElement).style.fontWeight = '900';
      }
      else menu.Ativo = false;
    })
  }

  marcarComoSelecionado(nome: string){
    if(nome != this.menuAnteriroSelecionado){
      (document.getElementById(nome) as HTMLButtonElement).style.borderBottom = 'thick solid #ed8f00';
      (document.getElementById(nome) as HTMLButtonElement).style.fontWeight = '900';

      (document.getElementById(this.menuAnteriroSelecionado) as HTMLButtonElement).style.borderBottom = 'none';
      (document.getElementById(this.menuAnteriroSelecionado) as HTMLButtonElement).style.fontWeight = 'normal';

      this.menuAnteriroSelecionado = nome;
    }

  }

  redirecionar(endereço: string) {
    this.router.navigateByUrl(`/${endereço}`);
  }

}
