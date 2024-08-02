import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarAreaProfessorComponent } from './sidebar-area-professor/sidebar-area-professor.component';


@NgModule({
  declarations: [SidebarAreaProfessorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    SidebarAreaProfessorComponent
  ]
})
export class SidebarAreaProfessorModule { }
