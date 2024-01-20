import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcessoModule } from './acesso/acesso.module';


const routes: Routes = [
  { path: '', redirectTo: 'acesso', pathMatch: 'full' },
  { path: 'acesso', loadChildren: () => import('./acesso/acesso.module').then(m => m.AcessoModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
