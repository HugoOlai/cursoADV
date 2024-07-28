import { NgModule } from '@angular/core';
import { AulaComponent } from './aula/aula.component';
import { Routes, RouterModule } from '@angular/router';
import { AreaAlunoComponent } from './areaAluno.component';
import { AlunoComponent } from './area-aluno/aluno.component';
import { ContratacaoComponent } from './contratacao/contratacao.component';

const routes: Routes = [
  {
    path: '',
    component: AreaAlunoComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: AlunoComponent},
      { path: 'contratacao/:id', component: ContratacaoComponent},
      { path: 'aula/:id', component: AulaComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class areaAlunoRoutes { }
