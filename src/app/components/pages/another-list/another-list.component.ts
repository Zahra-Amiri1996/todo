import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { ListModel } from '../../../models/list.model';
import { ColumnModel } from '../../../models/column.model';
import { BaseComponentComponent } from '../../share/base-component/base-component.component';
import { DeleteDialogComponent } from '../../share/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-another-list',
  imports: [
    MatButton,
    DatePipe,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    NgTemplateOutlet,
    MatColumnDef,
    MatHeaderCellDef
  ],
  templateUrl: './another-list.component.html',
  standalone: true,
  styleUrl: './another-list.component.scss'
})
export class AnotherListComponent extends BaseComponentComponent implements OnInit {
  // FOR TABLE
  columns = signal<ColumnModel<ListModel>[]>([]);
  dataSource = signal<ListModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'date', 'isMain', 'actions']);

  ngOnInit() {
    this.setColumns();
    this.getData();
  }

  setColumns() {
    this.columns.set([
      {
        columnDef: 'title',
        header: 'title',
        cell: (element: ListModel) => `${element.title}`,
        type: 'string'
      },
      {
        columnDef: 'date',
        header: 'date',
        cell: (element: ListModel) => `${element.date}`,
        type: 'date'
      },
      {
        columnDef: 'isMain',
        header: 'isMain',
        cell: (element: ListModel) => `${element.isMain}`,
        type: 'string'
      },
      {
        columnDef: 'actions',
        header: 'actions',
        cell: () => '',
        type: 'template'
      },
    ]);
  }

  getData(): void {
    const subscription = this.baseApiService.getAllLists().subscribe({
      next: (res) => {
        this.dataSource.set(res);
      },
      error: () => {
        alert('we have an error :(');
      }
    });
    this.subscriptions.add(subscription);
  }

  deleteList(row: ListModel) {
    this.subscriptions.add(this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {title: 'Delete Task', message: 'Are you sure ?'},
    }).afterClosed().subscribe(
      {
        next: (res) => {
          if (res) {
            if (row._id) {
              const subscription = this.baseApiService.deleteList(row._id).subscribe({
                next: () => {
                  this.getData();
                },
                error: () => {
                  alert('we have an error :(');
                }
              });
              this.subscriptions.add(subscription);
            }
          }
        }
      }
    ));
  }

  editList(row: ListModel): void {
    if (row._id) {
      this.router.navigate(['list-detail', row._id]).then();
    }
  }

  addList(): void {
    this.router.navigate(['list-detail']).then();
  }

  toToHandleTask(row: ListModel): void {
    this.router.navigate(['tasks', row._id]).then();
  }
}
