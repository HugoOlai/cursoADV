import { Router } from '@angular/router';
import { Util } from '../../class/util.class';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    public router: Router

  ) { }

  ngOnInit() {

  }

  redirecionar() {
    location.assign('#/acesso/login')
    window.location.reload();
  }

  buscar(){
    // console.log(this.pesquisa.value)
  }

}
