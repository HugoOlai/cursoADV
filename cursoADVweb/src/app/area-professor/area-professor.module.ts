import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { cursosComponent } from './cursos/cursos.component';
import { tarefaComponent } from './tarefa/tarefa.component';
import { alunosComponent } from './alunos/alunos.component';
import { VideosComponent } from './videos/videos.component';
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
import { VideosEditarComponent } from './videos/videos-editar/videos-editar.component';
import { VisualizarAlunoComponent } from './alunos/visualizar-aluno/visualizar-aluno.component';
import { SidebarAreaProfessorModule } from '../components/sidebarAreaProfessor/sidebar-area-professor.module';
import { CursoEditarAdicionarComponent } from './cursos/curso-editar-adicionar/curso-editar-adicionar.component';

@NgModule({
  declarations: [AreaProfessorComponent, CursoEditarAdicionarComponent, alunosComponent,
    cursosComponent, tarefaComponent, noticiasComponent, VisualizarAlunoComponent,
    VideosComponent, VideosEditarComponent],
  imports: [
    CommonModule,
    areaProfessorRoutes,
    FormsModule,
    SidebarAreaProfessorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    SnackBarModule,
    MatInputModule,
    MatDialogClose,
    MatButtonModule,
    MatSnackBarModule,
    RodaPeModule,
    AcessoRoutingModule,
  ]
})
export class AreaProfessorModule { }
