import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoComponent } from './acesso.component';
import { AcessoRoutingModule } from './acesso-routing.module';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AcessoComponent, LoginComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    MatInputModule
  ]
})
export class AcessoModule { }
