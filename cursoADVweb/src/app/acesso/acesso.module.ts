import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoComponent } from './acesso.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AcessoRoutingModule } from './acesso-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackBarModule } from '../components/snack-bar/snack-bar.module';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { RodaPeModule } from '../components/roda-pe/roda-pe.module';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';


@NgModule({
  declarations: [AcessoComponent, LoginComponent, CadastrarComponent, RecuperarComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    SnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RodaPeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AcessoRoutingModule,
  ]
})
export class AcessoModule { }
