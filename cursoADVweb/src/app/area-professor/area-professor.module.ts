import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { cursosComponent } from './cursos/cursos.component';
import { tarefaComponent } from './tarefa/tarefa.component';
import { alunosComponent } from './alunos/alunos.component';
import { TableModule } from '../components/table/table.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { noticiasComponent } from './noticias/noticias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AreaProfessorComponent } from './area-professor.component';
import { RodaPeModule } from '../components/roda-pe/roda-pe.module';
import { AcessoRoutingModule } from '../acesso/acesso-routing.module';
import { areaProfessorRoutes } from './area-professor.routing.module';
import { SnackBarModule } from '../components/snack-bar/snack-bar.module';
import { VisualizarAlunoComponent } from './alunos/visualizar-aluno/visualizar-aluno.component';
import { SidebarAreaProfessorModule } from '../components/sidebarAreaProfessor/sidebar-area-professor.module';

@NgModule({
  declarations: [AreaProfessorComponent, alunosComponent, cursosComponent, tarefaComponent, noticiasComponent, VisualizarAlunoComponent],
  imports: [
    CommonModule,
    areaProfessorRoutes,
    FormsModule,
    SidebarAreaProfessorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    SnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RodaPeModule,
    AcessoRoutingModule,
  ]
})
export class AreaProfessorModule { }
