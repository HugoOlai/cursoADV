import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areaProfessor',
  template: '<app-sidebar-area-professor></app-sidebar-area-professor><router-outlet></router-outlet>',
})
export class AreaProfessorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
