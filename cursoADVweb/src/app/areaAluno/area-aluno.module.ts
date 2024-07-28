import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulaComponent } from './aula/aula.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AreaAlunoComponent } from './areaAluno.component';
import { MatButtonModule } from '@angular/material/button';
import { areaAlunoRoutes } from './areaAluno.routing.module';
import { AlunoComponent } from './area-aluno/aluno.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RodaPeModule } from '../components/roda-pe/roda-pe.module';
import { SnackBarModule } from '../components/snack-bar/snack-bar.module';
import { ContratacaoComponent } from './contratacao/contratacao.component';
import { MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SidebarAreaAlunoModule } from '../components/sidebarAreaAluno/sidebar-area-aluno.module';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [AreaAlunoComponent, AlunoComponent, ContratacaoComponent, AulaComponent],
  imports: [
    CommonModule,
    areaAlunoRoutes,
    SidebarAreaAlunoModule,
    FormsModule,
    MatIconModule,
    SnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    PickerComponent,
    MatDatepickerModule,
    MatSelectModule,
    MatTreeModule,
    RodaPeModule
  ],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AreaAlunoModule { }
