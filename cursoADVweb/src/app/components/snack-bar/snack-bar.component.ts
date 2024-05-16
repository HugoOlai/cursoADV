import { Component, Input, inject } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  @Input('tipo') tipo: any;
  @Input('snackTexto') texto: any;
  @Input('horizontalPosition') horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  @Input('verticalPosition') verticalPosition: MatSnackBarVerticalPosition = 'top';

  snackBarRef = inject(MatSnackBarRef);

  constructor() { }

  ngOnInit() {
    console.log("Tipo: ",this.tipo)
  }

  defineCor(tipo: string){
    // switch(tipo){
    //   case 'success':
    //     return 'color: #002d40 !important';
    //   default:
    //     return '';
    // }
  }
}
