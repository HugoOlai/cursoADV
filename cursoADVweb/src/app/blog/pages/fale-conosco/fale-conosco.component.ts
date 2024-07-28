import { Component } from '@angular/core';
import { Util } from '../../../class/util.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrl: './fale-conosco.component.scss',

})
export class FaleConoscoComponent {
  formulario: FormGroup;
  isMobile = Util.isMobile();
  errorMessage = '';

  Nome = false;
  Email = false;
  Telefone = false;
  Mensagem = false;

  mascaraCelula = '(00) 00000-0000'
  constructor(
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      Nome: [null],
      Email: [null],
      Telefone: [null],
      Mensagem: [null],
    })
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      Nome: ['', Validators.required, Validators.name],
      Email: ['', Validators.required, Validators.email],
      Telefone: ['', Validators.required],
      Mensagem: ['', Validators.required],
    });

  }

  Enviar(){
    //if()
    if(this.formulario.controls['Nome'].value == ''){
      this.errorMessage = 'Digite o nome';
      this.Nome = true;
    }else{
      this.Nome = false;
      if(this.formulario.controls['Email'].value == ''){
        this.errorMessage = 'Digite o e-mail';
        this.Email = true;
      }else{
        this.Email = false;
        if(this.formulario.controls['Telefone'].value == ''){
          this.errorMessage = 'Digite o telefone';
          this.Telefone = true;
        }else{
          this.Telefone = false;
          if(this.formulario.controls['Mensagem'].value == ''){
            this.errorMessage = 'Digite a mensagem';
            this.Mensagem = true;
          }else{
            this.Mensagem = false;
          }
        }
      }
    }

    if(this.Nome && this.Email && this.Telefone && this.Mensagem){
      this.formulario.controls['Nome'].setValue('');
      this.formulario.controls['Email'].setValue('');
      this.formulario.controls['Telefone'].setValue('');
      this.formulario.controls['Mensagem'].setValue('');
    }


  }
}
