import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RodaPeComponent } from './roda-pe.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [RodaPeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
  ],
  exports:[
    RodaPeComponent
  ]
})
export class RodaPeModule { }
