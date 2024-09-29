import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Util } from '../../class/util.class';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Curso } from '../../shared/class/Curso.class';
import { AuthService } from '../../services/auth.service';
import { CursosService } from '../../services/cursos.service';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { ActionsTable, HeaderTable, OptionsTable } from '../../components/table/table.class';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CursoEditarAdicionarComponent } from './curso-editar-adicionar/curso-editar-adicionar.component';

export interface DialogDataCurso {
  curso: Curso;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class cursosComponent {
  verticalPosition: MatSnackBarVerticalPosition = SnackBarComponent.prototype.verticalPosition;
  horizontalPosition: MatSnackBarHorizontalPosition = SnackBarComponent.prototype.horizontalPosition;

  carregando: boolean = false;
  isMobile = Util.isMobile();
  listaCursos: Array<Curso> = [];
  curso: Curso;
  header: HeaderTable[] = [
    {
      description: 'Titulo',
      key: 'titulo', order: false, class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Data de lançamento',
      key: 'dataLançamentoFormatada',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Tipo de Curso',
      key: 'tipoCurso',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Valor',
      key: 'valorFormatado',
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
    caption: 'Total de {@} videos',
    empty: 'Não existem videos para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    pageSize: 5,
    handle: ()=>{},
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Cursos por página',

  };

  actions: ActionsTable[] = [
    {
      description: 'Editar',
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
    private cursosService: CursosService,
    private cookie: CookieService,
    private router: Router,
    private service: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

  ){
    this.curso = {
      id: "",
      titulo: "",
      tipoCurso: "CURSO",
      status: false,
      subtitulo: "",
      dataLançamento: new Date(),
      dataLançamentoFormatada: Util.dataFormatada(new Date()),
      estrutura: "",
      materialApoio: "",
      objetivo: "",
      topcos: [],
      valor: 0,
      valorCupom: 0,
      src: null,
      idImg: "",
      listaVideos: [],
      statusPago: false
    }
  }

  ngOnInit(): void {
    this.pegarCursos()
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }

  AdicionarCurso(){
    this.openDialog(this.curso)
  }

  pegarCursos(){
    this.listaCursos = [];
    this.carregando = true;

    this.cursosService.pegarTodos().subscribe((res: Array<Curso>)=>{
      res.forEach((curso: Curso) => {
        curso.dataLançamentoFormatada = Util.dataFormatada(curso.dataLançamento)
        curso.valorFormatado = Util.formataValor(curso.valor)
        curso.valorCupomFormatado = Util.formataValor(curso.valorCupom)
        this.listaCursos.push(curso)
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

  openDialog(item: Curso): void {
    const dialogRef = this.dialog.open(CursoEditarAdicionarComponent, {
      panelClass: "second-modal-backdrop",
      width: "80%",
      data: {
        curso: item
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var teste: any = dialogRef.componentRef;
      if(result.data){
        this.carregando = true;
        this.pegarCursos();
      }
    });
  }

  sair() {
    this.cookie.delete('nome');
    this.cookie.delete('email');
    this.service.clearUser();
    this.router.navigate(['acesso/loginProfessor']);
  }
}
