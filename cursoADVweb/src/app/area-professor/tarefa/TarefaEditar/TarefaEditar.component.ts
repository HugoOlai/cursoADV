import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Tarefa } from '../../../shared/class/Tarefa class';
import { TarefaService } from '../../../services/tarefa.service';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDataTarefa } from '../tarefa.component';

@Component({
  selector: 'app-TarefaEditar',
  templateUrl: './TarefaEditar.component.html',
  styleUrls: ['./TarefaEditar.component.scss']
})
export class TarefaEditarComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;

  carregando = false;
  tituloTarefa: string = "";
  descricaoTarefa: string = "";
  videoSelecionado: string = "";

  listaNomesCursos: Array<any> = [];
  listaNomesVideos: Array<any> = [];
  listaTarefas: Array<Tarefa> = [];

  constructor(
    private _snackBar: MatSnackBar,
    private tarefaService: TarefaService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataTarefa,
    public dialogRef: MatDialogRef<TarefaEditarComponent>,

  ) { }

  ngOnInit() {
    console.log(this.data)
    this.tituloTarefa = this.data.tarefa.nome;
    this.descricaoTarefa = this.data.tarefa.descricao;
    this.listaNomesVideos = this.data.listaNomesVideos
    var videoEncontrado = this.data.listaNomesVideos.find(v=> v.id == this.data.tarefa.idVideo)
    this.videoSelecionado = videoEncontrado.id;
    console.log(this.listaNomesVideos)
    console.log(this.videoSelecionado)
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  fechar(atualiza: boolean = false){
    this.dialogRef.close({data: atualiza});
  }

  salvar(){
    this.carregando = true;
    console.log(this.videoSelecionado)
    if(this.tituloTarefa == "" || this.descricaoTarefa == "" || this.videoSelecionado == ""){
      SnackBarComponent.prototype.texto = "PREENCHA TODOS OS CAMPOS"
      SnackBarComponent.prototype.tipo = 'warning';
      this.openSnackBar('warning');
      this.carregando = false;
    } else {
      this.carregando = true;

      this.tarefaService.editar({id:this.data.tarefa.id, Nome: this.tituloTarefa, Descricao: this.descricaoTarefa, IdVideo: this.videoSelecionado})
        .subscribe((res: any) => {
        this.carregando = false;
        this.fechar(true)

      }, (err: any) =>{
        console.log(err)
        this.carregando = false;

        if(err.status == 200){
          SnackBarComponent.prototype.texto = "TAREFA REGISTRADA COM SUCESSO"
          SnackBarComponent.prototype.tipo = 'success';
          this.openSnackBar('success');
          this.carregando = false;
          this.fechar(true)


        }
      })
    }
  }

}
