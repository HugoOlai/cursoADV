import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaAlunoComponent } from './area-aluno/area-aluno.component';
import { areaAlunoRoutes } from './areaAluno.routing.module';
import { SidebarAreaAlunoModule } from '../components/sidebarAreaAluno/sidebar-area-aluno.module';

@NgModule({
  declarations: [AreaAlunoComponent],
  imports: [
    CommonModule,
    areaAlunoRoutes,
    SidebarAreaAlunoModule
  ]
})
export class AreaAlunoModule { }
