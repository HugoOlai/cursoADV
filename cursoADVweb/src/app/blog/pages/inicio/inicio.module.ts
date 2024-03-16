import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }
