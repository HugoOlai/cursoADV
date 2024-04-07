import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { QuemSomosComponent } from './pages/quemSomos/quemSomos.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent},
      { path: 'quemSomos', component: QuemSomosComponent},
      { path: 'cursos', component: CursosComponent},
      { path: 'noticias', component: NoticiasComponent},
      // { path: 'foruns', component: forunsComponent},
      // { path: 'faleConosco', component: faleConoscoComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutes { }
