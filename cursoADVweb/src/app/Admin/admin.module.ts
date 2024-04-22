import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutes } from './admin.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './admin/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AcessoRoutingModule } from '../acesso/acesso-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    AdminRoutes,
    FormsModule,
    CommonModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AcessoRoutingModule,

  ]
})
export class adminModule { }
