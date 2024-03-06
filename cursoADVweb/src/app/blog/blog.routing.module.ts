import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { QuemSomosComponent } from './pages/quemSomos/quemSomos.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent},
      { path: 'quemSomos', component: QuemSomosComponent},
      // { path: 'cursos', component: cursosComponent},
      // { path: 'noticias', component: noticiasComponent},
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
