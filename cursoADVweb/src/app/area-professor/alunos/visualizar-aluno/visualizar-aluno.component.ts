import { Util } from '../../../class/util.class';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogDataUsuario } from '../alunos.component';
import { Curso } from '../../../shared/class/Curso.class';
import { AuthService } from '../../../services/auth.service';
import { CursosService } from './../../../services/cursos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderTable, OptionsTable } from '../../../components/table/table.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { ConfirmaItemComponent } from '../../../components/confirma-item/confirma-item.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visualizar-aluno',
  templateUrl: './visualizar-aluno.component.html',
  styleUrl: './visualizar-aluno.component.scss'
})
export class VisualizarAlunoComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // usuario: Usuario;

  visivel = false;
  visivel2 = false;
  carregando = false;
  editado = false;
  mensagem = "";
  tipoSelecionado: any;
  tipos: Array<any> = [
    {
      id: 1,
      nome: "PROFESSOR",
    },
    {
      id: 2,
      nome: "ALUNO",
    }
  ]

  bandeira: any;
  mesExpira: any;
  nomeCartao: any;
  numeroCartao: any;

  listaCursos: Array<Curso> = [];
  formularioUsuario: FormGroup;
  isMobile = Util.isMobile();

  header: HeaderTable[] = [
    {
      description: 'Nome',
      key: 'titulo', order: false, class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Data da Contratação',
      key: 'dataContratacaoFormatada',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Tipo',
      key: 'tipoCurso',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    },
    {
      description: 'Data de Lançamento',
      key: 'dataLançamentoFormatada',
      order: false,
      class: 'text-left',
      selectAll: false,
      select: false
    }
  ]

  options: OptionsTable = {
    select: false,
    selectAll: false,
    action: false,
    searchShow: false,
    lineSize: true,
    placeholder: '',
    captionShow: true,
    caption: 'Total de {@} processos',
    empty: 'Não existem processos para serem exibidos',
    pagination: true,
    modeCard: this.isMobile,
    lineMode: this.isMobile,
    textAction: 'Ação',
    class: "d-flex justify-content-center",
    pageSize: 5,
    handle: ()=>{},
    pagesSize: [5,10,15,20],
    descriptionPageSize: 'Processos por página',
    tdKeyList: ["numeroProcessoFormatado", 'statusFormatado'],

  };

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: AuthService,
    public dialog: MatDialog,
    private cursosService: CursosService,
    public usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataUsuario,
    public dialogRef: MatDialogRef<VisualizarAlunoComponent>,
  ){
    this.formularioUsuario = this.fb.group({
      Nome: [data.usuario.nome],
      Tipo: [data.usuario.tipo == null? "ALUNO" : data.usuario.tipo.toLocaleUpperCase()],
      Email: [data.usuario.email],
      Telefone: [data.usuario.telefone],
      CpfCnpj: [data.usuario.cpfCnpj],
      Cep: [data.usuario.endereco != null? data.usuario.endereco.cep : null],
      Rua: [data.usuario.endereco != null? data.usuario.endereco.rua : null],
      Numero: [data.usuario.endereco != null? data.usuario.endereco.numero : null],
      Complemento: [data.usuario.endereco != null? data.usuario.endereco.complemento : null],
      NumeroCartao: [data.usuario.cartao != null? data.usuario.cartao.numeroCartao : null],
      NomeCartao: [data.usuario.cartao != null? data.usuario.cartao.nomeCartao : null],
      MesExpira: [data.usuario.cartao != null? data.usuario.cartao.mesExpira + "/" + data.usuario.cartao.anoExpira : null],
      Bandeira: [data.usuario.cartao != null? data.usuario.cartao.creditCardBrand : null],
      NovaSenha: [""],
      ConfirmarSenha:[""]
    });

    this.tipoSelecionado = data.usuario.tipo == null? "ALUNO" : data.usuario.tipo.toLocaleUpperCase();
  }

  ngOnInit(): void {

    this.numeroCartao = this.formularioUsuario.get('NumeroCartao')
    this.nomeCartao = this.formularioUsuario.get('NomeCartao')
    this.mesExpira = this.formularioUsuario.get('MesExpira')
    this.bandeira = this.formularioUsuario.get('Bandeira')
    this.numeroCartao.disable()
    this.nomeCartao.disable()
    this.mesExpira.disable()
    this.bandeira.disable()

    this.carregando = true;
    if(this.data.usuario.listaCursos != null){
    this.cursosService.pegarTodos().subscribe((cursos: Array<Curso>)=>{

        this.data.usuario.listaCursos.forEach((cursoUsuario: Curso) => {

          //cursosIds.push(curso.id)
          var cursoEncontrado = cursos.find((curso: Curso)=> curso.id == cursoUsuario.id);
          if(cursoEncontrado != null){
            if(cursoUsuario.dataContratacao)
              cursoEncontrado.dataContratacaoFormatada = Util.dataFormatada(cursoUsuario.dataContratacao);

              cursoEncontrado.dataLançamentoFormatada = Util.dataFormatada(cursoEncontrado.dataLançamento);
              cursoEncontrado.statusPago = cursoUsuario.statusPago;
              this.listaCursos.push(cursoEncontrado)
            }
          // cursos.forEach((curso: Curso) => {
          //   if(curso.id == cursoUsuario.id){
          //     if(cursoUsuario.dataContratacao)
          //       curso.dataContratacaoFormatada = Util.dataFormatada(cursoUsuario.dataContratacao);

          //     curso.dataLançamentoFormatada = Util.dataFormatada(curso.dataLançamento);
          //     curso.statusPago = cursoUsuario.statusPago;
          //     this.listaCursos.push(curso)
          //   }
          // });
        });

        this.carregando = false;


        // console.log(this.listaCursos)
      }, err=> console.log(err));
    } else {
      this.mensagem = "USUARIO NÃO POSSUI CURSO"
    }


  }

  fechar(atualiza: boolean = false){
    this.dialogRef.close({data: atualiza});
  }

  editar(){
    const dialogRef = this.dialog.open(ConfirmaItemComponent, {
      panelClass: "second-modal-backdrop",
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        var item = this.formularioUsuario.value;
        var obj = {
          Id: this.data.usuario.id,
          Nome: item.Nome,
          Email: item.Email,
          Telefone: item.Telefone,
          CpfCnpj: item.CpfCnpj,
          Endereco:
            {
              Cep: item.Cep,
              Rua: item.Rua,
              Numero: item.Numero,
              Complemento: item.Complemento,
            },
          Tipo: item.Tipo
          // NumeroCartao: [data.usuario.cartao != null? data.usuario.cartao.numeroCartao : null],
          // NomeCartao: [data.usuario.cartao != null? data.usuario.cartao.nomeCartao : null],
          // MesExpira: [data.usuario.cartao != null? data.usuario.cartao.mesExpira + "/" + data.usuario.cartao.anoExpira : null],
          // Bandeira: [data.usuario.cartao != null? data.usuario.cartao.creditCardBrand : null],
          // NovaSenha: [""],
          // ConfirmarSenha:[""]
        }

        this.carregando = true;

        this.usuarioService.atualizar(obj).subscribe(res=>{
          // console.log(res)
          SnackBarComponent.prototype.texto = res.toUpperCase();
          SnackBarComponent.prototype.tipo = 'success';
          this.openSnackBar('success');
          this.fechar(true)
        }, err=>{
          if(err.status == 200){
            SnackBarComponent.prototype.texto = err.error.text.toUpperCase();
            SnackBarComponent.prototype.tipo = 'success';
            this.openSnackBar('success');
            this.fechar(true)

          }
        })
      }
      // this.animal = 'outroTteste';

    });
  }

  openSnackBar(defineClass: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
      panelClass: defineClass
    });
  }
}
