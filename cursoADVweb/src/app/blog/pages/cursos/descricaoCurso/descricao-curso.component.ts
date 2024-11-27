import { Component } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../../../shared/class/Curso.class';
import { Usuario } from '../../../../shared/class/Usuario.class';
import { Util } from '../../../../class/util.class';
import { HttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { identifierName } from '@angular/compiler';
import { ArquivosService } from '../../../../services/arquivos.service';

@Component({
  selector: 'app-descricao-curso',
  templateUrl: './descricao-curso.component.html',
  styleUrl: './descricao-curso.component.scss'
})
export class DescricaoCursoComponent {
  isMobile = Util.isMobile();
  carregando = true;
  private accessToken: any;
  usuario?: Usuario;
  curso: Curso;

  listaCursos: Array<Curso> = [];

  ListaAvaliacoes: Array<any> = [
    {
      nome: 'Luff D Monkey',
      estrelas:["","","","",""],
      conteudo:`Com a orientação focada e o suporte do
        grupo, consegui superar minhas
        dificuldades. Fui aprovada na segunda fase
        do concurso graças à metodologia e ao
        ambiente de apoio que encontrei aqui`,
     css:'pequeno',
     src:'https://img.freepik.com/fotos-gratis/designer-trabalhando-no-modelo-3d_23-2149371896.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710633600&semt=sph'
    },
    {
      nome: 'Ivankov Inperatris',
      estrelas:["","","","",""],
      conteudo:`Com a orientação focada e o suporte do
        grupo, consegui superar minhas
        dificuldades. Fui aprovada na segunda fase
        do concurso graças à metodologia e ao
        ambiente de apoio que encontrei aqui`,
     css:'grande',
     src:'https://valentinahair.com.br/web/wp-content/uploads/2022/05/DUDA-1B.jpg'
    },
    {
      nome: 'Bruno O Mestre',
      estrelas:["","","","",""],
      conteudo:`Com a orientação focada e o suporte do
        grupo, consegui superar minhas
        dificuldades. Fui aprovada na segunda fase
        do concurso graças à metodologia e ao
        ambiente de apoio que encontrei aqui`,
      css:'pequeno', src:'../../../../assets/imgs/a.png'
    },
  ]

  constructor(
    private service: AuthService,
    public router: Router,
    public cursosService: CursosService,
    private activedRoute: ActivatedRoute,
    private arquivosService: ArquivosService,
    private authService: SocialAuthService,
    private httpClient: HttpClient
  ) {
    this.usuario = this.service.getUser();
    this.curso = this.cursosService.get();
  }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: any) => {
      if(params['id'] != undefined){
        var obj: any = {
          id: params['id']
        }

        this.cursosService.pegar(obj).subscribe(res=>{
          this.curso = res;
          var divisao = this.curso.valor/12;
          this.curso.parcelas = `12x de ${Util.formataValor(divisao)}`;
          this.curso.valorFormatado = Util.formataValor(this.curso.valor) ;
          this.curso.valorComDesconto = Util.formataValor(this.curso.valor - 200);
          this.arquivosService.pegarArquivo(this.curso.idImg).subscribe(res=>{
            this.curso.src = res.base64;
            this.curso.idImg = res.id;
          })

          this.carregando = false;
        })
      } else {
        this.carregando = false;

        if(this.curso == undefined || this.curso == null){
          this.router.navigate(['blog/cursos']);

        } else{
          var divisao = this.curso.valor/12;
              this.curso.parcelas = `12x de ${Util.formataValor(divisao)}`
              this.curso.valorFormatado = Util.formataValor(this.curso.valor) ;
              this.curso.valorComDesconto = Util.formataValor(this.curso.valor - 200)
        }
      }
    })

    // this.getAccessToken()

  }

  redirecionar(){
    console.log(this.curso.link)
    window.location.href = this.curso.link;
    //this.router.navigate([`areaAluno/contratacao/${this.curso?.id}`]);

  }

  // getAccessToken(): void {
  //   console.log('teste')
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken =>
  //   {
  //     this.accessToken = accessToken;
  //     this.getGoogleVideo()
  //   });
  // }

  // getGoogleVideo(): void {
  //   if (!this.accessToken) return;

  //   console.log(this.accessToken)
  //   this.httpClient
  //     .get('https://www.googleapis.com/drive/v3/files/16aLd5ZgzmkJlrf1t-_Q0AV2VMV6AtGtt', {
  //       headers: { Authorization: `Bearer ${this.accessToken}` },
  //     })
  //     .subscribe((events) => {
  //       alert('Look at your console');
  //       console.log('events', events);
  //     });
  // }

  direita(){
    var lista:any = [];
    var cont = 0;
    var principal = false;
    this.ListaAvaliacoes.forEach((element:any) => {
      if(cont > 0){
        if(cont == 1){
          element.css = 'pequeno'
          lista.push(element);

        }else{
          if(!principal){
            element.css = 'grande'
            lista.push(element);
            principal = true;
          } else {
            lista.push(element);
          }
        }
      }
      cont++
    });

    lista.push(this.ListaAvaliacoes[0])
    this.ListaAvaliacoes = lista;

  }

  esquerda(){
    var lista:Array<any> = [];
    var cont = 0;

    this.ListaAvaliacoes.forEach(avaliacao => {

      if(cont == 0){
        avaliacao.css = 'grande'
        lista.push(avaliacao)
      }else if(cont == 1){
        avaliacao.css = 'pequeno'
        lista.push(avaliacao)
      }else{
        avaliacao.css = 'pequeno'
        lista.unshift(avaliacao)
      }
      cont++
    })

    this.ListaAvaliacoes = lista;

  }
}
