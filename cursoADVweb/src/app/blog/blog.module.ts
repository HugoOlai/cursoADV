import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForunsComponent } from './pages/foruns/foruns.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { QuemSomosComponent } from './pages/quemSomos/quemSomos.component';
@NgModule({
  declarations: [
    BlogComponent,
    InicioComponent,
    QuemSomosComponent,
    CursosComponent,
    NoticiasComponent,
    ForunsComponent
  ],
  imports: [
    CommonModule,
    BlogRoutes,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
  ],

})
export class BlogModule { }
