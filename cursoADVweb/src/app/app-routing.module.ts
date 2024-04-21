import { AreaAlunoModule } from './areaAluno/area-aluno.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcessoModule } from './acesso/acesso.module';
import { AuthComponent } from './auth/auth.component';
import { AuthAdminComponent } from './auth/auth-admin.component';


const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
  { path: 'acesso', loadChildren: () => import('./acesso/acesso.module').then(m => m.AcessoModule)},
  { path: 'areaAluno', loadChildren: () => import('./areaAluno/area-aluno.module').then(m => m.AreaAlunoModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'Auth/:hash', component: AuthComponent },
  { path: 'AuthAdmin/:hash', component: AuthAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
