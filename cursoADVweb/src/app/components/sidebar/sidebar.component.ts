import { Router } from '@angular/router';
import { Util } from '../../class/util.class';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from '../../app.component';

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
    // AppComponent.prototype.defineBarraSideBar(false);

    this.router.navigate(['acesso/login'])
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

  buscar(){
    // console.log(this.pesquisa.value)
  }

}
