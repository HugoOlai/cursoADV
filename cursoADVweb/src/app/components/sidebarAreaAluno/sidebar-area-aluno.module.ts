import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarAreaAlunoComponent } from './sidebar-area-aluno/sidebar-area-aluno.component';


@NgModule({
  declarations: [SidebarAreaAlunoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    SidebarAreaAlunoComponent
  ]
})
export class SidebarAreaAlunoModule { }
