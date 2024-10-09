import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { SidebarAreaAlunoComponent } from './sidebar-area-aluno/sidebar-area-aluno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from '../table/table.module';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarModule } from '../snack-bar/snack-bar.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogClose } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [SidebarAreaAlunoComponent, EditarAlunoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    FormsModule,
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
  ],
  exports: [
    SidebarAreaAlunoComponent
  ]
})
export class SidebarAreaAlunoModule { }
