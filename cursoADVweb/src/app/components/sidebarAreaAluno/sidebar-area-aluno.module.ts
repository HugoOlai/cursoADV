import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAreaAlunoComponent } from './sidebar-area-aluno/sidebar-area-aluno.component';



@NgModule({
  declarations: [SidebarAreaAlunoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarAreaAlunoComponent
  ]
})
export class SidebarAreaAlunoModule { }
