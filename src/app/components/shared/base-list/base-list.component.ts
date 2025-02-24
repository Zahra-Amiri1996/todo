import { Component, inject, input, output } from '@angular/core';
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
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

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
    MatHeaderCellDef,
    MatButtonModule,
    CurrencyPipe,
    DatePipe,
    MatIcon,
    NgTemplateOutlet
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
  hasAddListButton = input(false);

  editTask = output<T>();
  deleteTask = output<T>();
  addTask = output<T>();
  router = inject(Router);

  // gotoCreateTask() {
  //   this.router.navigate(['list', 'task']).then();
  // }

  edit(row: T) {
    this.editTask.emit(row);
  }

  delete(row: T) {
    this.deleteTask.emit(row);
  }

  add(row: T): void {
    this.addTask.emit(row);
  }
}
