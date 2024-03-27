import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';

@NgModule({
  declarations: [BlogComponent, InicioComponent],
  imports: [
    CommonModule,
    BlogRoutes,
  ],

})
export class BlogModule { }
