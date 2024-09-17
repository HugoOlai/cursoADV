import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { BlogComponent } from '../../blog/blog.component';

@Component({
  selector: 'app-roda-pe',
  templateUrl: './roda-pe.component.html',
  styleUrl: './roda-pe.component.scss'
})
export class RodaPeComponent {
  isMobile = Util.isMobile()
  menuAnteriroSelecionado = "Início";

  ngOnInit() {
    if(window.location.href.includes('cursos'))
      this.menuAnteriroSelecionado = 'Cursos';

    if(window.location.href.includes('quemSomos'))
      this.menuAnteriroSelecionado = 'Quem Somos';

    if(window.location.href.includes('inicio'))
      this.menuAnteriroSelecionado = 'Início';
  }

  direciona(nome: string){
    BlogComponent.prototype.menuAnteriroSelecionado = this.menuAnteriroSelecionado;
    BlogComponent.prototype.marcarComoSelecionado(nome);
    this.menuAnteriroSelecionado = nome;
  }
}
