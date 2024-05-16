import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaAlunoComponent } from './areaAluno.component';
import { areaAlunoRoutes } from './areaAluno.routing.module';
import { AlunoComponent } from './area-aluno/aluno.component';
import { ContratacaoComponent } from './contratacao/contratacao.component';
import { SidebarAreaAlunoModule } from '../components/sidebarAreaAluno/sidebar-area-aluno.module';

@NgModule({
  declarations: [AreaAlunoComponent, AlunoComponent, ContratacaoComponent],
  imports: [
    CommonModule,
    areaAlunoRoutes,
    SidebarAreaAlunoModule
  ]
})
export class AreaAlunoModule { }
