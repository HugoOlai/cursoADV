import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cursosComponent } from './cursos/cursos.component';
import { tarefaComponent } from './tarefa/tarefa.component';
import { alunosComponent } from './alunos/alunos.component';
import { TableModule } from '../components/table/table.module';
import { noticiasComponent } from './noticias/noticias.component';
import { AreaProfessorComponent } from './area-professor.component';
import { areaProfessorRoutes } from './area-professor.routing.module';
import { SidebarAreaProfessorModule } from '../components/sidebarAreaProfessor/sidebar-area-professor.module';



@NgModule({
  declarations: [AreaProfessorComponent, alunosComponent, cursosComponent, tarefaComponent, noticiasComponent],
  imports: [
    CommonModule,
    areaProfessorRoutes,
    SidebarAreaProfessorModule,
    TableModule
  ]
})
export class AreaProfessorModule { }
