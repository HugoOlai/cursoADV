import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { cursosComponent } from './cursos/cursos.component';
import { alunosComponent } from './alunos/alunos.component';
import { AreaProfessorComponent } from './area-professor.component';
import { tarefaComponent } from './tarefa/tarefa.component';
import { noticiasComponent } from './noticias/noticias.component';

const routes: Routes = [
  {
    path: '',
    component: AreaProfessorComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: alunosComponent},
      { path: 'cursos', component: cursosComponent},
      { path: 'tarefas', component: tarefaComponent},
      { path: 'noticias', component: noticiasComponent},

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class areaProfessorRoutes { }
