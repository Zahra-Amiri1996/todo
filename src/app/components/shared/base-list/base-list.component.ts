import { Component, input } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import { ColumnModel } from './models/column.model';

@Component({
  selector: 'app-base-list',
  imports: [
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    MatTable,
    MatCellDef,
    MatHeaderCellDef
  ],
  templateUrl: './base-list.component.html',
  standalone: true,
  styleUrl: './base-list.component.scss'
})
export class BaseListComponent<T> {
  columns = input.required<ColumnModel<T>[]>();
  dataSource = input.required<T[]>();
  displayedColumns = input.required<string[]>();
  hasRemoveRowButton = input(false);
  hasAddRowButton = input(false);
}
