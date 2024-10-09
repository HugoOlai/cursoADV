import { Router } from '@angular/router';
import { Util } from '../../../class/util.class';
import { Component, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Curso } from '../../../shared/class/Curso.class';
import { AuthService } from '../../../services/auth.service';
import { CursosService } from './../../../services/cursos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDataUsuario } from './../../../area-professor/alunos/alunos.component';
import { SnackBarComponent } from '../../../components/snack-bar/snack-bar.component';
import { ActionsTable, HeaderTable, OptionsTable } from '../../../components/table/table.class';
import { ConfirmaItemComponent } from '../../../components/confirma-item/confirma-item.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ArquivosService } from '../../../services/arquivos.service';
import { SelectedFiles } from '../../../Admin/admin/admin.component';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrl: './editar-aluno.component.scss'
})

export class EditarAlunoComponent {
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

  email: any;
  bandeira: any;
  mesExpira: any;
  nomeCartao: any;
  numeroCartao: any;
  cursoSelecionado: any;

  listaCursosFiltrada: Array<Curso> = [];
  listaTodosCursos: Array<Curso> = [];
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
    action: true,
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

  actions: ActionsTable[] = [
    {
      description: 'Deletar',
      icon: 'edit',
      isButton: true,
      class: 'btn btn-danger btn-sm rounded-pill icon-button-only ',
      tooltip: '',
      classIcon: 'ft-14',
      placement: 'top',
      handle: (item: any) => { this.removerCurso(item) }
    }
  ]


  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service: AuthService,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    private cursosService: CursosService,
    public usuarioService: UsuarioService,
    private arquivosService: ArquivosService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataUsuario,
    public dialogRef: MatDialogRef<EditarAlunoComponent>,
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
    this.email = this.formularioUsuario.get('Email')
    this.numeroCartao.disable()
    this.nomeCartao.disable()
    this.mesExpira.disable()
    this.bandeira.disable()
    this.email.disable()

    this.carregando = true;
    this.cursosService.pegarTodos().subscribe((cursos: Array<Curso>)=>{
      cursos.forEach(curso => {
          //if(curso.status)
          this.listaTodosCursos.push(curso)
      });
      if(this.data.usuario.listaCursos != null)
        this.data.usuario.listaCursos.forEach((cursoUsuario: Curso) => {

          //cursosIds.push(curso.id)
          var cursoEncontrado = cursos.find((curso: Curso)=> curso.id == cursoUsuario.id);
          if(cursoEncontrado != null){
            this.arquivosService.pegarArquivo(cursoEncontrado.idImg).subscribe((res: any)=>{
              if(cursoEncontrado != undefined)
                cursoEncontrado.src = res.base64;

              this.carregando = false;

            });
            if(cursoUsuario.dataContratacao)
              cursoEncontrado.dataContratacaoFormatada = Util.dataFormatada(cursoUsuario.dataContratacao);

              cursoEncontrado.dataLançamentoFormatada = Util.dataFormatada(cursoEncontrado.dataLançamento);
              cursoEncontrado.statusPago = cursoUsuario.statusPago;
              this.listaCursosFiltrada.push(cursoEncontrado)
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

    if(this.data.usuario.listaCursos != null){
      this.mensagem = "USUARIO NÃO POSSUI CURSO";
      this.carregando = false;

    }


  }

  assistirAula(curso: Curso){
    this.router.navigate([`areaAluno/inicio`]);
    this.router.navigate([`areaAluno/aula/${curso.id}`]);
    setTimeout(() => {
      this.fechar(true);

    }, 1000);
  }

  uploadImgCurso(event: any){
    const keys = Object.keys(event.target.files);
    var files = event.target.files
    var reader = new FileReader();
    const result = new AsyncSubject<SelectedFiles[]>();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => { // called once readAsDataURL is completed
      // if(event.target != null)
        //this.imagemSelecionada = reader.result;
    }

    Object.keys(files)?.forEach(async (file, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        //this.listaArquivosApoio = this.listaArquivosApoio?.filter(f => f?.name != files[i]?.name)
        // this.listaArquivosApoio.push(files[i])
        var imgCurso = { nome: files[i]?.name, file: "",
          base64: reader?.result as string }
        this.data.usuario.src = imgCurso.base64;

        //result.next(imgCurso);
        if (files?.length === (i + 1)) {
          result.complete();
        }

      };
    });

    //this.imagemSelecionada = event.target.files[0]
  }

  adicionar(){
    this.carregando = true;
    var cursoEncontrado = this.data.usuario.listaCursos == null? false: this.data.usuario.listaCursos.find(c=> c.id == this.cursoSelecionado.id)
    if(!cursoEncontrado){
      var obj: any ={
        "id" : this.cursoSelecionado.id,
        "dataContratacao" : new Date(),
        "valorPago" : this.cursoSelecionado.valor,
        "statusPago" : true,
        "idPagamentoAsaas" : "",
        "tipoCurso" : this.cursoSelecionado.tipoCurso
      }

      if(this.data.usuario.listaCursos == null)
        this.data.usuario.listaCursos = []

      if(this.cursoSelecionado.dataContratacao != null)
        this.cursoSelecionado.dataContratacaoFormatada = Util.dataFormatada(this.cursoSelecionado.dataContratacao);

      this.cursoSelecionado.dataLançamentoFormatada = Util.dataFormatada(this.cursoSelecionado.dataLançamento);
      this.cursoSelecionado.statusPago = this.cursoSelecionado.statusPago;
      this.listaCursosFiltrada.push(this.cursoSelecionado)

      this.data.usuario.listaCursos.push(obj)

    }else{
      SnackBarComponent.prototype.texto = "CURSO JÁ FOI ADICIONADO"
      SnackBarComponent.prototype.tipo = 'error';
      this.openSnackBar('error');
    }

    setTimeout(() => {
      this.carregando = false;

    }, 1000);

  }

  removerCurso(item: Curso){
    var lista: Array<Curso> = [];
    this.listaCursosFiltrada.forEach(curso=>{
      if(curso.id != item.id)
        lista.push(curso)
    })

    this.listaCursosFiltrada = lista;
    this.data.usuario.listaCursos = lista;
    // const dialogRef = this.dialog.open(ConfirmaItemComponent, {
    //   panelClass: "second-modal-backdrop",
    //   width: "450px"
    //   mensagem: "R"
    // });

    // dialogRef.afterClosed().subscribe(result => {

    // })
  }

  pegarCurso(curso: Curso){
    this.cursoSelecionado = curso;

  }

  fechar(atualiza: boolean = false){
    this.dialogRef.close({data: atualiza});
  }

  editar(){
    const dialogRef = this.dialog.open(ConfirmaItemComponent, {
      panelClass: "second-modal-backdrop",
      width: "450px",
      data:{ mensagem: "Deseja realmente atualizar suas informações?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        var item = this.formularioUsuario.value;
        var obj = {
          Id: this.data.usuario.id,
          Nome: item.Nome,
          Src: this.data.usuario.src,
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
          Tipo: item.Tipo,
          ListaCursos: this.data.usuario.listaCursos
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
