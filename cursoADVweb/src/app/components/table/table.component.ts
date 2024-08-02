import { Component, Input } from '@angular/core';
import { ActionsTable, HeaderTable, OptionsTable } from './table.class';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input("lista") lista: any[] = [];
  @Input("permissoes") permissoes: any[] = [];
  @Input("header") header: HeaderTable[] = [];
  @Input("actions") actions?: ActionsTable[] = [];
  @Input("options") options?: OptionsTable = new OptionsTable();
}
