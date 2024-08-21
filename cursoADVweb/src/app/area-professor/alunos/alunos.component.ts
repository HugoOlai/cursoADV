import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../shared/class/Usuario.class';
import { UsuarioService } from '../../services/usuario.service';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { VisualizarAlunoComponent } from './visualizar-aluno/visualizar-aluno.component';
import { ActionsTable, HeaderTable, OptionsTable } from '../../components/table/table.class';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface DialogDataUsuario {
  usuario: Usuario;
}

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class alunosComponent {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;

  carregando: boolean = true;
  isMobile = Util.isMobile();
  listaAlunos: Array<Usuario> = [];

  header: HeaderTable[] = [
    {
      description: 'Nome',
      key: 'nome', order: false, class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Cpf/CpfCnpj',
      key: 'cpfCnpj',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Email',
      key: 'email',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Telefone',
      key: 'telefone',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    }
  ]

  options: OptionsTable = {
    select: false,
    selectAll: false,
    action: true,
    searchShow: false,
    lineSize: true,
    placeholder: '',
    captionShow: true,
    caption: 'Total de {@} alunos',
    empty: 'Não existem alunos para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    pageSize: 5,
    handle: ()=>{},
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Alunos por página',

  };

  actions: ActionsTable[] = [
    {
      description: 'Visualizar',
      icon: 'edit',
      isButton: true,
      class: 'btn btn-primary btn-sm rounded-pill icon-button-only',
      tooltip: '',
      classIcon: 'ft-14',
      placement: 'top',
      handle: (item: any) => { this.openDialog(item) }
    }
  ]

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AuthService,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    public usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.pegarUsuarios();
  }

  pegarUsuarios(){
    this.listaAlunos = [];

    this.usuarioService.listaUsuarios().subscribe((res: Array<Usuario>)=>{
      // console.log(res)
      res.forEach(usuario => {
        this.listaAlunos.push(usuario)
      });
      this.carregando = false
    }, err =>{
      // console.log(err)
      if(err.statusText == "Unknown Error"){
        SnackBarComponent.prototype.texto = `SESSÃO EXPIROU, CONECTE NOVAMENTE`;
        SnackBarComponent.prototype.tipo = 'warning';
        this.openSnackBar('warning');
        this.sair();
      }
    })
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  pegarSelecionados(){

  }

  openDialog(item: any): void {
    const dialogRef = this.dialog.open(VisualizarAlunoComponent, {
      panelClass: "second-modal-backdrop",
      width: "80%",
      data: {
        usuario: item
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var teste: any = dialogRef.componentRef;
      console.log(result);
      // if(result){
        this.carregando = true;
        this.pegarUsuarios();
      // }
    });
  }

}
