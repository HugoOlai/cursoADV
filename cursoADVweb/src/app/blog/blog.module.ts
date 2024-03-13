import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing.module';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutes,
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
