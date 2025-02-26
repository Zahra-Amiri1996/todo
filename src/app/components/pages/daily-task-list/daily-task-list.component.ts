import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ColumnModel } from '../../../models/column.model';
import { ListModel } from '../../../models/list.model';
import { MatIconButton } from '@angular/material/button';
import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
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
import { TaskModel } from '../../../models/task.model';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { BaseComponentComponent } from '../../share/base-component/base-component.component';
import { DeleteDialogComponent } from '../../share/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-daily-task-list',
  imports: [
    CurrencyPipe,
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
    MatHeaderCellDef,
    MatCard,
    MatCardContent,
    MatCheckbox,
  ],
  templateUrl: './daily-task-list.component.html',
  standalone: true,
  styleUrl: './daily-task-list.component.scss'
})
export class DailyTaskListComponent extends BaseComponentComponent implements OnInit, OnDestroy {
  columns = signal<ColumnModel<TaskModel>[]>([]);
  dataSource = signal<TaskModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'date', 'description', 'actions']);
  mainList = signal<ListModel>({_id: '', isMain: false, title: '', date: new Date()});

  ngOnInit(): void {
    this.setColumns();
    this.getMainData();
  }

  setColumns() {
    this.columns.set([
      {
        columnDef: 'title',
        header: 'title',
        cell: (element: TaskModel) => `${element.title}`,
        type: 'string'
      },
      {
        columnDef: 'date',
        header: 'date',
        cell: (element: TaskModel) => `${element.date}`,
        type: 'date'
      },
      {
        columnDef: 'description',
        header: 'description',
        cell: (element: TaskModel) => `${element.description}`,
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

  getTasksFromMainList(listId: string) {
    this.dataSource.set([]);
    const subscription = this.baseApiService.getTasksByList(listId).subscribe({
      next: (res) => {
        this.dataSource.set(res);
      },
      error: () => {
        alert('we have an error :(');
      }
    });
    this.subscriptions.add(subscription);
  }

  getMainData(): void {
    const subscription = this.baseApiService.getMainList().subscribe({
      next: (res) => {
        this.mainList.set(res);
        if (res._id) {
          this.getTasksFromMainList(res._id);
        }
      },
      error: () => {
        alert('we have an error :(');
      }
    });
    this.subscriptions.add(subscription);
  }

  deleteTask(row: ListModel) {
    this.subscriptions.add(this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {title: 'Delete Task', message: 'Are you sure ?'},
    }).afterClosed().subscribe(
      {
        next: (res) => {
          if (res) {
            if (row._id) {
              const subscription = this.baseApiService.deleteTask(row._id).subscribe({
                next: () => {
                  this.getTasksFromMainList(this.mainList()._id);
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

  editList(row: TaskModel): void {
    if (row._id) {
      this.router.navigate(['task', row._id]).then();
    }
  }
}
