import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoComponent } from './acesso.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: AcessoComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent},
      // { path: 'recuperar', component: RecuperarSenhaComponent },
      // { path: 'download', component: DownloadComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcessoRoutingModule { }
