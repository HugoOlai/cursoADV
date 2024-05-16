import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratacaoComponent } from './contratacao/contratacao.component';
import { AlunoComponent } from './area-aluno/aluno.component';
import { AreaAlunoComponent } from './areaAluno.component';

const routes: Routes = [
  {
    path: '',
    component: AreaAlunoComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: AlunoComponent},
      { path: 'contratacao/:id', component: ContratacaoComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class areaAlunoRoutes { }
