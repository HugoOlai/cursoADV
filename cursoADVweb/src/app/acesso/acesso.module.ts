import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoComponent } from './acesso.component';
import { AcessoRoutingModule } from './acesso-routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AcessoComponent, LoginComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule
  ]
})
export class AcessoModule { }
