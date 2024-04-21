import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaAlunoComponent } from './area-aluno/area-aluno.component';

const routes: Routes = [
  {
    path: '',
    component: AreaAlunoComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: AreaAlunoComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class areaAlunoRoutes { }
