import { Pergunta } from './../../../shared/class/Video';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Util } from '../../../class/util.class';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { CursosService } from '../../../services/cursos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ArquivosService } from '../../../services/arquivos.service';
import { DialogDataPergunta } from '../responder-perguntas.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edita-resposta',
  templateUrl: './edita-resposta.component.html',
  styleUrl: './edita-resposta.component.scss'
})
export class EditaRespostaComponent {
  carregando = false;
  isMobile = Util.isMobile();
  formularioPergunta: FormGroup;
  pergunta: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: AuthService,
    private cursosService: CursosService,
    private arquivosService: ArquivosService,
    public usuarioService: UsuarioService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPergunta,
    public dialogRef: MatDialogRef<EditaRespostaComponent>,

  ){
    this.formularioPergunta = this.fb.group({
      //Pergunta: [data.pergunta.conteudo],
      Resposta: [data.pergunta.resposta],
    });
  }

  ngOnInit(): void {
    // this.pergunta = this.formularioPergunta.get('Pergunta');
    // this.pergunta.disable();
    if(this.data.pergunta.listaResposta == null)
      this.data.pergunta.listaResposta = []
  }

  fechar(atualiza: boolean = false){
    this.dialogRef.close({data: atualiza});
  }

  adicionaResposta(){
    this.data.pergunta.listaResposta.push({ nome: 'teste', resposta: this.formularioPergunta.get('Resposta')?.value, tipo: 0})
  }

  salvar(){

  }
}