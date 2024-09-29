import { AsyncSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Arquivo } from './../../shared/class/Arquivo.class';
import { CursosService } from '../../services/cursos.service';
export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isMobile = Util.isMobile();
  formularioCadastro: FormGroup;

  outroTeste: any;
  arquivoSelecionado: any;
  videoSelecionado: any;
  imagemSelecionada: any;
  imagensACarregar: any;
  listaVideos:Array<any> = [];
  listaArquivosApoio:Array<any> = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private cursoService: CursosService,

  ){
    this.formularioCadastro = this.fb.group({
      Titulo: [""],
      Subtitulo: [""],
      Objetivo: [""],
      Estrutura: [""],
      MaterialApoio: [""],
    });
  }

  ngOnInit(){}

  limpar(){
    this.imagemSelecionada = null;
  }

  upload(event: any) {
    const keys = Object.keys(event.target.files);
    var files = event.target.files
    var reader = new FileReader();
    const result = new AsyncSubject<SelectedFiles[]>();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      if(event.target != null)
        this.imagemSelecionada = reader.result;
    }

    // this.imagensACarregar = keys.map((key: any) => {
    //   if (key !== 'length') {
    //     return event.target.files[key];
    //   }
    // });

    Object.keys(files)?.forEach(async (file, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        this.listaArquivosApoio = this.listaArquivosApoio?.filter(f => f?.name != files[i]?.name)
        // this.listaArquivosApoio.push(files[i])
        this.listaArquivosApoio.push({ name: files[i]?.name, file: files[i],
          base64: reader?.result as string })
        result.next(this.listaArquivosApoio);
        if (files?.length === (i + 1)) {
          result.complete();
        }
      };
    });

    this.imagemSelecionada = event.target.files[0]

    // if(event.target.files[0].type == 'video/mp4'){
    //   this.listaVideos.push(btoa(this.imagemSelecionada))
    // } else {
    //   this.listaArquivosApoio.push(btoa(this.imagemSelecionada))
    // }


    // if(this.imagensACarregar.length > 0) {
    //   event.target.value = '';
    // }
  }



  salvar(){
    var form = this.formularioCadastro.value;
    // var teste: string = 'teste';
    // teste.substring(0, teste.length/2)
    // form.Arquivo = this.listaArquivosApoio[0].base64.substring(0, this.listaArquivosApoio[0].base64.length/2)
    //form.listaArquivosApoio = this.listaArquivosApoio;

    // form.Arquivo = this.imagemSelecionada
    this.cursoService.cadastrar(form).subscribe({
      next: res=>{
      },
      error:err=>{
        //console.log(err);

      }
    })
  }
}
