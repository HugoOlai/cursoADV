import { FormControl } from '@angular/forms';
import { Util } from '../../class/util.class';
import { fromEvent, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActionsTable, HeaderTable, OptionsTable } from './table.class';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
var coluna: any;


function inverteData(data: any){

  var splitString = data.includes(" ") ? data.split(" ") : data;
  var listaReversa = splitString[0].split("/");

  listaReversa[2] = listaReversa[2] + "/"
  listaReversa[1] = listaReversa[1] + "/"
  var juntarLista = listaReversa.reverse().join("")

  return juntarLista.includes("undefined")? data : juntarLista;
}

function asc (a: any, b: any){
  // console.log({coluna: coluna})
  // console.log({a: a})

  if(coluna == 'Data/Hora' || coluna == 'Data da Criação' ||
    coluna == 'Data Atualização' ||
    coluna == 'Data' || coluna == 'data' ||
    coluna == 'Data do Expediente' || coluna == 'Competência' ||
    coluna == 'Data do cadastro' || coluna == 'Data da Criação' ){
    var dataA = new Date(a.data || a.dataCadastro);
    var dataB = new Date(b.data || a.dataCadastro);

    if(a.dataDaAlteracao != undefined){
      dataA = new Date(inverteData(a.dataDaAlteracao));
      dataB = new Date(inverteData(b.dataDaAlteracao));
    }else{
      if(a.competencia != undefined){
        dataA = new Date(inverteData(a.competencia));
        dataB = new Date(inverteData(b.competencia));
      } else {
        if(a.Data != undefined || a.dataCadastro){
          dataA = new Date(inverteData(a.Data || a.dataCadastro));
          dataB = new Date(inverteData(b.Data || a.dataCadastro));
        } else {
          dataA = new Date(inverteData(a.data));
          dataB = new Date(inverteData(b.data));

        }
      }
    }

    return dataA.valueOf() - dataB.valueOf();
  }

  if(coluna == 'Data Cadastro' ){
    var dataA = new Date(a.dataCadastro);
    var dataB = new Date(b.dataCadastro);
    return dataA.valueOf() - dataB.valueOf();

  }

  if(coluna == 'Data Upload' ){
    var dataA = new Date(a.dataCadastro);
    var dataB = new Date(b.dataCadastro);
    return dataA.valueOf() - dataB.valueOf();
  }

  if(coluna == 'CPF/CNPJ' || coluna == 'Cpf/Cnpj'){
    if(a.cpfCnpj != "Sem informação"){
      let valor1 = Number(a.cpfCnpj.replace('.','').replace('.','').replace('/','').replace('-','')),
          valor2 = Number(b.cpfCnpj.replace('.','').replace('.','').replace('/','').replace('-',''));

      if(valor1 > valor2) {return 1} else return -1
    }
  }

  if(coluna == 'Número do Processo'){
    let valor1 = Number(a.numeroProcesso.replace('.','').replace('-','')),
        valor2 = Number(b.numeroProcesso.replace('.','').replace('-',''));

    if(valor1 > valor2) {return 1} else return -1
  }

  if(coluna.trim() == 'Status' || coluna == "Status do Tribunal"){
    if(a.lidoBadge != undefined){
      let textoA = a.lidoBadge
      .replace("<span",'')
      .replace("class='",'')
      .replace("badge",'')
      .replace("text-white",'')
      .replace("badge-info",'')
      .replace("badge-success",'')
      .replace("badge-danger",'')
      .replace("badge-secondary",'')
      .replace("badge-primary",'')
      .replace("'>",'')
      .replace('</span>'),
     textoB = b.lidoBadge
      .replace("<span",'')
      .replace("class='",'')
      .replace("badge",'')
      .replace("text-white",'')
      .replace("badge-info",'')
      .replace("badge-success",'')
      .replace("badge-danger",'')
      .replace("badge-secondary",'')
      .replace("badge-primary",'')
      .replace("'>",'')
      .replace('</span>');

      return textoA.replace('undefined', '').localeCompare(textoB.replace('undefined', ''));
    }

    var tipoA = a.statusFormatado != undefined ? 'statusFormatado': 'StatusFormatado'
    var tipoB = b.statusFormatado != undefined ? 'statusFormatado': 'StatusFormatado'
   let textoA = a[tipoA]
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("text-white",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>'),
       textoB = b[tipoB]
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("text-white",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>');

    return textoA.localeCompare(textoB.replace('undefined', ''));
  }

  if(coluna == 'Tipo'){
    "<span class='badge badge-danger'>Exclusao</span>"
    "<span class='badge badge-success'>Cadastro</span>"

    var textoA = a.Tipo
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>');
    var textoB = b.Tipo
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>');

// console.log(textoA.replace('undefined', ''))

    return textoA.replace('undefined', '').localeCompare(textoB.replace('undefined', ''));

  }

  if(coluna == "Tipo Leitura"){
    let valor1 = a.lido.replace("<span class='badge badge-danger'>",'').replace('</span>',''),
        valor2 = b.lido.replace("<span class='badge badge-danger'>",'').replace('</span>','');

    if(valor1 > valor2) {return 1} else return -1;
  }

  if(coluna == "Valor"){
    let valor1 = 0,
        valor2 = 0;
    if(a.valorDescricao != undefined){
      valor1 = Number(a.valorDescricao.replace("R$ ",'').replace(',','')),
      valor2 = Number(b.valorDescricao.replace("R$ ",'').replace(',',''));

    } else {
      valor1 = Number(a.valor.replace("R$ ",'').replace(',','')),
      valor2 = Number(b.valor.replace("R$ ",'').replace(',',''));

    }

    // console.log(valor1, valor2)
    if(valor1 > valor2) {return 1} else return -1;
  }

  if(coluna == "Tamanho"){
    if(a.tamanho > b.tamanho) { return 1 } else return -1;
  }

  if(coluna == "Instância"){
    if(a.instancia > b.instancia) {return 1} else return -1;
  }

  if(coluna == "Qtd"){
    let valor1 = Number(a.andamentos.replace("<span class='badge badge-primary minw-35'>",'').replace('</span>','')),
        valor2 = Number(b.andamentos.replace("<span class='badge badge-primary minw-35'>",'').replace('</span>',''));

    if(valor1 > valor2) {return 1} else return -1;
  }

  if(coluna == 'Qtd. Processos'){
    if(a.qtdProcessos > b.qtdProcessos) {return 1} else return -1;
  }

  if(coluna == 'Dias sem movimentações'){
    if(a.quantidadeDiasSemMovimentacao > b.quantidadeDiasSemMovimentacao) {return 1} else return -1;
  }

  if(coluna == 'Qtd. de andamentos'){
    if(a.qtdAndamentosNovos > b.qtdAndamentosNovos) {return 1} else return -1;
  }

  if(coluna == 'Extensão')
  {
    return a.extensao.replace('.', '').localeCompare(a.extensao.replace('.', ''))
  }

  if(coluna == 'Login'){
    return a.login.localeCompare(b.login)
  }

  if(coluna == "Perfil"){
    return a.perfil.localeCompare(b.perfil);
  }

  if(coluna == "Email"){
    return a.email.localeCompare(b.email);
  }

  if(coluna == "OAB"){
    return a.Oab.localeCompare(b.Oab);
  }

  if(coluna == "Uf"){
    return a.uf.localeCompare(b.uf);
  }

  if(coluna == "Subconta"){
    return a.nomeSubCategoria.localeCompare(b.nomeSubCategoria);
  }

  if(coluna == "Conta"){
    return a.nomeCategoria.localeCompare(b.nomeCategoria);
  }

  if(coluna == "Usuário" || coluna == "Alterado Por"){
    if(a['nomeUsuario'] != undefined)
      return a["nomeUsuario"].localeCompare(b["nomeUsuario"]);

    if(a["Usuário"] != undefined)
      return a["Usuário"].localeCompare(b["Usuário"]);
    else
      return a.responsavel.localeCompare(b.responsavel);
  }

  if(coluna == "Responsável"){
    return a['Responsável'].localeCompare(b['Responsável']);
  }

  if(coluna == 'Autor(es)'){

    if(a.autores.length == 0) a.autores.push('SEM RESPOSTA');
    if(b.autores.length == 0) b.autores.push('SEM RESPOSTA');

    return a.autores[0].localeCompare(b.autores[0]);
    // return a.autores[0].includes(b.autores[0].toUpperCase()) ? 0 : a.autores[0].toUpperCase() > b.autores[0].toUpperCase()? 1 : -1
  }

  if(coluna == "Réu(s)"){
    if(a.reus.length == 0) a.reus.push('SEM RESPOSTA');
    if(b.reus.length == 0) b.reus.push('SEM RESPOSTA');

    return a.reus[0].localeCompare(b.reus[0])

  }

  if(coluna == "Nome Pesquisado"){
    if(a.nomePesquisa != null)
      return a.nomePesquisa.localeCompare(b.nomePesquisa)
  }

  if(coluna == "Nome" || coluna =="Nome Arquivo"){
    if(a.nome != undefined)
      return a.nome.localeCompare(b.nome)

    if(a.nomePessoa != null)
      return a.nomePessoa.localeCompare(b.nomePessoa)
  }

  if(coluna == "Extensão "){
    return a.extensao.localeCompare(b.extensao)
  }

  if(coluna == "Tipo do recurso"){
    return a.tipoRecursoDescricao.localeCompare(b.tipoRecursoDescricao);
  }

  if(coluna == 'Comarca'){
    return a.comarca.localeCompare(b.comarca);
  }

  if(coluna == "Tribunal"){
    return a.tribunal.localeCompare(b.tribunal)
  }

  if(coluna == "Subtipo"){
    return a.nomeFormatado.localeCompare(b.nomeFormatado)
  }

  if(coluna == "Tipo")
  {
    return a.tipoLog.localeCompare(b.tipoLog);
  }

  if(coluna =="De"){
    return a.statusAnterior.localeCompare(b.statusAnterior)
  }

  if(coluna =="Para"){
    return a.statusAtual.localeCompare(b.statusAtual)
  }

  if(coluna == "Descrição"){
    return a.descricao.localeCompare(b.descricao)
  }

  if(coluna == "Celula"){
    var celulaA: any;
    var celulaB: any;
    if(a.celula == null) celulaA = 'SEM CÉLULA';
    if(b.celula == null) celulaB = 'SEM CÉLULA';

    return a.celula == null
    ? celulaA.localeCompare(b.celula == null? celulaB : b.celula.nome)
    : a.celula.nome.localeCompare(b.celula == null? celulaB : b.celula.nome)
  }

  return 0;
}

function dasc (a: any, b: any){

  if(coluna == 'Data/Hora' || coluna == 'Data da Criação' ||
    coluna == 'Data Atualização' ||
    coluna == 'Data' || coluna == 'data' ||
    coluna == 'Data do Expediente' || coluna == 'Competência' ||
    coluna == 'Data do cadastro' || coluna == 'Data da Criação' ){

    var dataA = new Date();
    var dataB = new Date();

    if(a.dataDaAlteracao != undefined){
      dataA = new Date(inverteData(a.dataDaAlteracao));
      dataB = new Date(inverteData(b.dataDaAlteracao));
    } else {
      if(a.competencia != undefined){
        dataA = new Date(inverteData(a.competencia));
        dataB = new Date(inverteData(b.competencia));
      } else {
        if(a.Data != undefined){
          dataA = new Date(inverteData(a.Data));
          dataB = new Date(inverteData(b.Data));
        } else {
          dataA = new Date(inverteData(a.data));
          dataB = new Date(inverteData(b.data));

        }
      }
    }

    return dataB.valueOf() - dataA.valueOf();
  }

  if(coluna == 'Número do Processo'){
    let valor1 = Number(a.numeroProcesso.replace('.','').replace('-','')),
        valor2 = Number(b.numeroProcesso.replace('.','').replace('-',''));

    if(valor1 > valor2) {return -1} else return 1

  }

  if(coluna.trim() == 'Status' || coluna == "Status do Tribunal"){
    if(a.lidoBadge != undefined){
      let textoA = a.lidoBadge
      .replace("<span",'')
      .replace("class='",'')
      .replace("badge",'')
      .replace("text-white",'')
      .replace("badge-info",'')
      .replace("badge-success",'')
      .replace("badge-danger",'')
      .replace("badge-secondary",'')
      .replace("badge-primary",'')
      .replace("'>",'')
      .replace('</span>'),
     textoB = b.lidoBadge
      .replace("<span",'')
      .replace("class='",'')
      .replace("badge",'')
      .replace("text-white",'')
      .replace("badge-info",'')
      .replace("badge-success",'')
      .replace("badge-danger",'')
      .replace("badge-secondary",'')
      .replace("badge-primary",'')
      .replace("'>",'')
      .replace('</span>');

      return textoA.replace('undefined', '').localeCompare(textoB.replace('undefined', ''));
    }

    var tipoA = a.statusFormatado != undefined ? 'statusFormatado': 'StatusFormatado'
    var tipoB = b.statusFormatado != undefined ? 'statusFormatado': 'StatusFormatado'
    let textoA = a[tipoA]
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("text-white",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>'),
       textoB = b[tipoB]
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("text-white",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>');

     return textoA.replace('undefined', '').localeCompare(textoB.replace('undefined', '')) == 1? -1 : 1;
   }

  if(coluna == 'Tipo'){

    var textoA = a.Tipo
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>');
    var textoB = b.Tipo
        .replace("<span",'')
        .replace("class='",'')
        .replace("badge",'')
        .replace("badge-info",'')
        .replace("badge-success",'')
        .replace("badge-danger",'')
        .replace("badge-secondary",'')
        .replace("'>",'')
        .replace('</span>');

    return textoA.replace('undefined', '').localeCompare(textoB.replace('undefined', '')) == 1? -1 : 1;

  }

  if(coluna == 'Tipo Leitura'){
    let valor1 = a.lido.replace("<span class='badge badge-danger'>",'').replace('</span>',''),
        valor2 = b.lido.replace("<span class='badge badge-danger'>",'').replace('</span>','');

    if(valor2 > valor1) {return 1} else return -1
  }

  if(coluna == 'CPF/CNPJ' || coluna == 'Cpf/Cnpj'){
    if(a.cpfCnpj != "Sem informação"){
      let valor1 = Number(a.cpfCnpj.replace('.','').replace('.','').replace('/','').replace('-','')),
          valor2 = Number(b.cpfCnpj.replace('.','').replace('.','').replace('/','').replace('-',''));

      if(valor1 > valor2) {return -1} else return 1
    }
  }

  if(coluna == "Valor"){
    let valor1 = 0,
        valor2 = 0;
    if(a.valorDescricao != undefined){
      valor1 = Number(a.valorDescricao.replace("R$ ",'').replace(',','')),
      valor2 = Number(b.valorDescricao.replace("R$ ",'').replace(',',''));

    } else {
      valor1 = Number(a.valor.replace("R$ ",'').replace(',','')),
      valor2 = Number(b.valor.replace("R$ ",'').replace(',',''));

    }

    if(valor1 > valor2) {return -1} else return 1;
  }

  if(coluna == "Tamanho"){
    if(a.tamanho > b.tamanho) { return -1 } else return 1;
  }

  if(coluna == "Instância"){
    if(a.instancia > b.instancia) {return -1} else return 1;
  }

  if(coluna == "Qtd"){
    let valor1 = Number(a.numeroProcesso.replace("<span class='badge badge-primary minw-35'>",'').replace('</span>','')),
        valor2 = Number(b.numeroProcesso.replace("<span class='badge badge-primary minw-35'>",'').replace('</span>',''));

    if(valor2 > valor1) {return -1} else return 1;
  }

  if(coluna == 'Qtd. Processos'){
    if(a.qtdProcessos > b.qtdProcessos) {return -1} else return 1;
  }

  if(coluna == 'Dias sem movimentações'){
    if(a.quantidadeDiasSemMovimentacao > b.quantidadeDiasSemMovimentacao) {return -1} else return 1;
  }

  if(coluna == 'Qtd. de andamentos'){
    if(a.qtdAndamentosNovos > b.qtdAndamentosNovos) {return -1} else return 1;
  }

  if(coluna == 'Data Cadastro' ){
    var dataA = new Date(a.dataCadastro);
    var dataB = new Date(b.dataCadastro);
    return dataB.valueOf() - dataA.valueOf();

  }

  if(coluna == 'Data Upload' ){
    var dataA = new Date(a.dataCadastro);
    var dataB = new Date(b.dataCadastro);
    return dataB.valueOf() - dataA.valueOf();

  }

  if(coluna == "Tipo do recurso"){
    return a.tipoRecursoDescricao.localeCompare(b.tipoRecursoDescricao) == 1? -1 : 1;
  }

  if(coluna == 'Comarca'){
    return a.comarca.localeCompare(b.comarca) == 1? -1 : 1;
  }

  if(coluna == 'Extensão')
  {
    return a.extensao.replace('.', '').localeCompare(a.extensao.replace('.', '')) == 1? -1 : 1;
  }

  if(coluna == 'Login'){
    return a.login.localeCompare(b.login) == 1? -1 : 1;
  }

  if(coluna == "Perfil"){
    return a.perfil.localeCompare(b.perfil) == 1? -1 : 1;
  }

  if(coluna == "Email"){
    return a.email.localeCompare(b.email) == 1? -1 : 1;
  }

  if(coluna == "OAB"){
    return a.Oab.localeCompare(b.Oab) == 1? -1 : 1;
  }

  if(coluna == "Uf"){
    return a.uf.localeCompare(b.uf) == 1? -1 : 1;
  }

  if(coluna == "Subconta"){
    return a.nomeSubCategoria.localeCompare(b.nomeSubCategoria) == 1? -1 : 1;
  }

  if(coluna == "Conta"){
    return a.nomeCategoria.localeCompare(b.nomeCategoria) == 1? -1 : 1;
  }

  if(coluna == 'Usuário' || coluna == "Alterado Por"){
    if(a['nomeUsuario'] != undefined)
      return a["nomeUsuario"].localeCompare(b["nomeUsuario"]) == 1? -1 : 1;

    if(a["Usuário"] != undefined)
      return a["Usuário"].localeCompare(b["Usuário"]) == 1? -1 : 1;
    else
      return a.responsavel.localeCompare(b.responsavel) == 1? -1 : 1;

  }

  if(coluna == "Responsável"){
    return a['Responsável'].localeCompare(b['Responsável']) == 1? -1 : 1;
  }

  if(coluna == 'Autor(es)'){
    if(a.autores.length == 0) a.autores.push('SEM RESPOSTA');
    if(b.autores.length == 0) b.autores.push('SEM RESPOSTA');

    return a.autores[0].localeCompare(b.autores[0]) == 1? -1 : 1;
    // return a.autores[0].includes(b.autores[0].toUpperCase()) ? 0 : a.autores[0].toUpperCase() > b.autores[0].toUpperCase()? 1 : -1
  }

  if(coluna == "Réu(s)"){
    if(a.reus.length == 0) a.reus.push('SEM RESPOSTA');
    if(b.reus.length == 0) b.reus.push('SEM RESPOSTA');

    return a.reus[0].localeCompare(b.reus[0]) == 1? -1 : 1;

  }

  if(coluna == "Nome Pesquisado"){
    if(a.nomePesquisa != null)
      return a.nomePesquisa.localeCompare(b.nomePesquisa) == 1? -1 : 1;
  }

  if(coluna == "Nome" || coluna =="Nome Arquivo"){
    if(a.nome != undefined)
      return a.nome.localeCompare(b.nome) == 1? -1 : 1;

    if(a.nomePessoa != null)
      return a.nomePessoa.localeCompare(b.nomePessoa) == 1? -1 : 1;
  }

  if(coluna == "Extensão "){
    return a.extensao.localeCompare(b.extensao) == 1? -1: 1;
  }

  if(coluna == "Tribunal"){
    return a.tribunal.localeCompare(b.tribunal) == 1? -1 : 1;
  }

  if(coluna == "Subtipo"){
    return a.nomeFormatado.localeCompare(b.nomeFormatado) == 1? -1 : 1;
  }

  if(coluna == "Tipo")
  {
    return a.tipoLog.localeCompare(b.tipoLog) == 1? -1 : 1;
  }

  if(coluna =="De"){
    return a.statusAnterior.localeCompare(b.statusAnterior) == 1? -1 : 1;
  }

  if(coluna =="Para"){
    return a.statusAtual.localeCompare(b.statusAtual) == 1? -1 : 1;
  }

  if(coluna == "Descrição"){
    return a.descricao.localeCompare(b.descricao) == 1? -1 : 1;
  }

  if(coluna == "Celula"){
    var celulaA: any;
    var celulaB: any;
    if(a.celula == null) celulaA = 'SEM CÉLULA';
    if(b.celula == null) celulaB = 'SEM CÉLULA';

    return a.celula == null
    ? celulaA.localeCompare(b.celula == null? celulaB : b.celula.nome) == 1? -1 : 1
    : a.celula.nome.localeCompare(b.celula == null? celulaB : b.celula.nome) == 1? -1 : 1;
  }

  return 0;
}

const portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges{
  loading: boolean = true;
  @Input('text') text: string = '';
  @Input('position') position: string = 'center';
  @Input('justifycontent') justifycontent: string = 'center';
  @Input('space') space: string = 'pt-3';
  @Input('altura') altura: number = 20;

  @Input("lista") lista: any[] = [];
  @Input("permissoes") permissoes: any[] = [];
  @Input("header") header: HeaderTable[] = [];
  @Input("actions") actions: ActionsTable[] = [];

  @Input("pastaId") pastaId: any;
  @Input("cliente") cliente: any;
  @Input("processo") processo: any;
  @Input("fornecedor") fornecedor: any;
  @Input("pagina") paginaAtual: any = 1;

  @Input("options") options: OptionsTable = new OptionsTable();
  //paginaAtual = 1;

  @Output("busca") busca = new EventEmitter<any>();
  @Output("editar") editar = new EventEmitter<any>();
  @Output("remover") remover = new EventEmitter<any>();
  @Output("editado") editado = new EventEmitter<any>();
  @Output("adicionar") adicionar = new EventEmitter<any>();

  @Output("update") update = new EventEmitter<any[]>();
  @Output("selection") selection = new EventEmitter<any[]>();

  @Output("paginar") paginar? = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator: any;
  // @ViewChild(CardDirective, {static: true}) cardhost: CardDirective;

  search = new FormControl();
  //value$ = new Subscription();

  clientX: any;
  clientY: any;

  listaSearch: any[] = [];
  listaSelected: any[] = [];
  displayedColumns: string[] = [];

  colunaAcao: string | undefined = "";
  captionText: string = '{@}';
  textoSelecionarTodos: string = 'Selecionar todos';

  botaoAcao: boolean = false;
  selectAll: boolean = false;
  checkboxSelecionada: boolean = false;
  botaoAcaoSelecionado: boolean = false;

  startItem: number = 0;
  totalcols: number = 0;

  subscription: Subscription;
  isMobile = Util.isMobile();
  dataSource = new MatTableDataSource<any>(this.lista);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = fromEvent(document, 'mousemove')
    .subscribe((e: any) => {
      var tooltips: any = document.querySelectorAll('.tooltip-span');
      var x = (e.clientX + 20) + 'px';
      var y = (e.clientY + 20) + 'px';
      for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].style.top = y;
        tooltips[i].style.left = x;
      }
    });
  }

  ngOnInit() {
    this.dataSource.data = this.lista;
    this.subscription = fromEvent(document, 'mousemove')
    .subscribe((e: any) => {
      var tooltips: any = document.querySelectorAll('.tooltip-span');
      var x = (e.clientX + 20) + 'px';
      var y = (e.clientY + 20) + 'px';
      for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].style.top = y;
        tooltips[i].style.left = x;
      }
    });

    // console.log(this.lista)
    //this.init(this.lista);
    this.init(this.lista);


  }

  ngAfterViewInit() {
    // this.init(this.lista);
    this.init(this.lista);

    if(this.isMobile)
      this.iniciaPaginacaoMobile();

    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.previousPageLabel = 'Voltar página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.getRangeLabel = portugueseRangeLabel;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  ngOnChanges(changes: any): void {

    let lista: any = changes.lista.currentValue;
    this.displayedColumns = [];
    this.defineHeads();

    if (lista)
      this.lista = lista;
    else this.lista = [];

    this.init(lista);

  }

  init(listaTable: any[]) {
    this.listaSearch = [];

    listaTable = listaTable.slice(0, this.options.pageSize);

    this.mergeSort(listaTable, 0, listaTable.length);

    this.dataSource.data = this.lista;
    this.changeDetectorRef.detectChanges();
    this.loading = false;

    // setTimeout(() => {

    // }, 2000);
  }

  mergeSort(lista: any, posicaoInicio: any, posicaoFim: any){
    if(posicaoInicio == 0 && posicaoFim == 0) return;

    if(lista.length > 100){
      var listapPrimeiraParte = lista.slice(0, Math.round(lista.length/2));
      var listaSegundaParte = lista.slice(Math.round(lista.length/2));

      listapPrimeiraParte.forEach((item: any) => {
        if(typeof(item.status) == 'string' || typeof(item.Status) == 'string'){
          item.StatusFormatado = item.status != undefined? item.status : item.Status;
        } else {
          if(item.tipoPagina != 'Log' && item.tipoPagina != 'Financeiro' && item.tipoPagina != 'nomePesquisa' && item.tipoPagina != 'prazos'){
            if(item.status == true || item.Status == true)
              item.StatusFormatado = `<span class='badge badge-success'>Ativo</span>`;
            else if(item.status != undefined || item.Status != undefined)
              item.StatusFormatado = `<span class='badge badge-danger'>Inativo</span>`;

          }
        }

        this.listaSearch.push(item);

      });

      this.mergeSort(listaSegundaParte, 0, listaSegundaParte.length);
    }else{
      lista.forEach((item: any )=> {
        if(typeof(item.status) == 'string' || typeof(item.Status) == 'string'){
          item.StatusFormatado = item.status != undefined? item.status : item.Status;
        } else {
          if(item.tipoPagina != 'Log' && item.tipoPagina != 'Financeiro' && item.tipoPagina != 'nomePesquisa' && item.tipoPagina != 'prazos'){
            if(item.status == true || item.Status == true)
              item.StatusFormatado = `<span class='badge badge-success'>Ativo</span>`;
            else if(item.status != undefined || item.Status != undefined)
              item.StatusFormatado = `<span class='badge badge-danger'>Inativo</span>`;
          }
        }

        this.listaSearch.push(item)

      });

      return;
    }
  }

  defineHeads(){
    this.colunaAcao = this.options.textAction == '' ? 'Ações': this.options.textAction;
    var adicionarHead = true;

    this.displayedColumns = [];
    var lista: any = [];
    this.header.forEach(header => {
      if(header.description != undefined){
        this.displayedColumns.push(header.description);
        lista.push(header);

        if(header.description == this.colunaAcao || this.colunaAcao == 'Ações' && this.isMobile)
          adicionarHead = false;
      }
    });

    this.header = lista;

    if(this.options.action){
      if(adicionarHead && !this.isMobile){
        var obj: any = { description: this.colunaAcao, key: this.colunaAcao, key2: this.colunaAcao,
          order: false, class: 'text-left', hasTooltip: true, hasFunc: false, selectAll: false, select: false }
        this.header.push(obj)
      }

      if(this.colunaAcao != undefined)
        if(!this.displayedColumns.includes(this.colunaAcao) && adicionarHead)
          this.displayedColumns.push(this.colunaAcao);

    }
  }

  ordenaLista(sortState: Sort) {
    this.sort["_direction"] = sortState.direction;
    this.dataSource.sort = this.sort;

    coluna = sortState.active;
    if (sortState.direction == "asc") {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      // // if(sortState.active == )
      // this.sort.sort(sortState)
       this.lista.sort(asc);
       this.init(this.lista);

    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      this.lista.sort(dasc);
      this.init(this.lista);

    }
  }

  btnAcao(act: any, item: any){
    act.class.includes('btn-outline-secondary') && act.description.toUpperCase() != "LOG" ? null : act.handle.call(act.handle, item)
  }

  capturarTooltips(e: any, show: boolean) {
    if (show) {
      this.clientX = e.clientX, + 20;
      this.clientY = e.clientY + 20;
    }
  }


  check(item: any) {

    if (this.options.selectAll) {
      item.selected = !item.selected;
      this.selectAll = false;
      this.listaSelected = this.lista.filter((x: any) => x.selected);
      this.selection.emit(this.listaSelected);
    }
    else {
      let temp: any = null;
      this.listaSelected = this.lista.map((x: any) => {
        if (item.id == x.id) {
          item.selected = !item.selected;
          temp = x;
          if (!item.selected) temp = null;
        }
        else x.selected = false;
        return x;
      });

      this.init(this.listaSelected);

      this.selection.emit(temp);
    }
  }

  formataTamanhoTexto(head: any, item: any){
    var result;
    var largura = window.innerWidth;

    if(head.key.includes('Too')) {
      if(item[head.key].length > 6) {
        if(item[head.key].includes('-v')) {
          result = item[head.key].replace('-v', '-')

        } else {
          if(largura <= 1366)
            result = item[head.key].substring(0, 6)+'...'
          else
            result = item[head.key]

        }
      }  else {
        result = item[head.key]

      }
    }  else {
      result = item[head.key]

    }

    return result
  }

  mostrarActionInfo(act: any, item: any) {
    if (act.show == undefined) return false;
    let show: boolean = act.show.call(act.show, item);
    return act.show != undefined && act.value != undefined && !show;
  }


  iniciaPaginacaoMobile(){
    var pageSize = this.options.pageSize;
    const startItem = 0;
    const endItem = startItem + pageSize;
    var lista = this.lista.slice(startItem, endItem);
    this.dataSource.data = lista;
  }

  getTooltip(act: any, item: any) {
    if (act.tooltipD == undefined) return false;
    return act.tooltipD.call(act.show, item);
  }

  mostrarAction(act: any, item: any) {
    if (act.show == undefined) return true;

    return act.show.call(act.show, item);
  }

  mostrarValue(act: any, item: any) {
    return act.value.call(act.show, item);
  }



  getDescription(act: any, item: any) {
    if (act.descriptionD == undefined) return false;
    return act.descriptionD.call(act.show, item);
  }

  handlePageEvent(e: PageEvent) {
    var pageSize = e.pageSize;
    this.options.pageSize = e.pageSize;

    const startItem = e.pageIndex * pageSize;
    const endItem = startItem + pageSize;
    let listaTable = this.lista.slice(startItem, endItem);

    this.init(listaTable);
  }

  checkAll() {
    this.selectAll = !this.selectAll;
    this.listaSelected = this.listaSearch.map((x: any) => {
      x.selected = this.selectAll;
      return x;
    });
    this.lista = this.lista.map((x: any) => {
      x.selected = this.selectAll;
      return x;
    });
    this.listaSelected = this.listaSearch.filter((x: any) => x.selected);
    let lista = this.lista.filter((x: any) => x.selected);
    this.init(this.lista);

    this.selection.emit(lista);

    this.textoSelecionarTodos = this.textoSelecionarTodos == 'Selecionar todos' ? 'Desmarcar todos' : 'Selecionar todos';
  }

  validaNullOuVazio(item: any){
    return Util.isNullOrEmpty(item);
  }

  mostrarTextoNomeMobile(act: any, item: any) {
    if (act.nomeMobile == undefined) return '';
    return act.nomeMobile.call(act.nomeMobile, item);
  }


}

