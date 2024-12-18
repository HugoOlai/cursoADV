import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForunsComponent } from './pages/foruns/foruns.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { QuemSomosComponent } from './pages/quemSomos/quemSomos.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { DescricaoCursoComponent } from './pages/cursos/descricaoCurso/descricao-curso.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent},
      { path: 'quemSomos', component: QuemSomosComponent},
      { path: 'cursos', component: CursosComponent},
      { path: 'cursos/descricao', component: DescricaoCursoComponent},
      { path: 'cursos/descricao/:id', component: DescricaoCursoComponent},
      { path: 'noticias', component: NoticiasComponent},
      { path: 'foruns', component: ForunsComponent},
      { path: 'faleConosco', component: FaleConoscoComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutes { }
