import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing.module';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutes,
  ],
})
export class BlogModule { }
