import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Util } from '../../class/util.class';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  pesquisa = new FormControl('');
  isMobile = Util.isMobile();
  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {

  }

  buscar(){
    // console.log(this.pesquisa.value)
  }

}
