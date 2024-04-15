import { NgModule } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ForunsComponent } from './pages/foruns/foruns.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { QuemSomosComponent } from './pages/quemSomos/quemSomos.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { SidebarModule } from '../components/sidebar/sidebar.module';
@NgModule({
  declarations: [
    BlogComponent,
    InicioComponent,
    QuemSomosComponent,
    CursosComponent,
    NoticiasComponent,
    ForunsComponent,
    FaleConoscoComponent
  ],
  imports: [
    CommonModule,
    BlogRoutes,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    SidebarModule,
    ReactiveFormsModule,
    PickerComponent,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    })
  ],
  providers:[
    provideNgxMask(),

  ]

})
export class BlogModule { }
