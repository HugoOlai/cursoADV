import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../acesso/pages/login/login.component';


@Component({
  selector: 'app-confirma-item',
  templateUrl: './confirma-item.component.html',
  styleUrl: './confirma-item.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmaItemComponent {
  resposta: boolean = false;
  mensagem: string = "";
  subMensagem: string = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmaItemComponent>,
  ){}

  ngOnInit(): void {
    this.mensagem = this.data.mensagem
    this.subMensagem = this.data.subMensagem
  }

  validaResposta(resposta: boolean){
    this.resposta = resposta;
    this.dialogRef.close();

  }
}
