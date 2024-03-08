import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { SidebarComponent } from './sidebar.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
  ],
  exports:[
    SidebarComponent
  ]
})
export class SidebarModule { }
