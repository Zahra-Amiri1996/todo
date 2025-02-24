import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ColumnModel } from '../../../models/column.model';
import { ListModel } from '../../../models/list.model';
import { BaseApiService } from '../../../services/base-api.service';
import { Subscription } from 'rxjs';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-completed-tasks-list',
  imports: [
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
  templateUrl: './completed-tasks-list.component.html',
  standalone: true,
  styleUrl: './completed-tasks-list.component.scss'
})
export class CompletedTasksListComponent implements OnInit, OnDestroy {
  columns = signal<ColumnModel<TaskModel>[]>([]);
  dataSource = signal<TaskModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'date', 'description', 'actions']);
  baseApiService = inject(BaseApiService);
  subscriptions = new Subscription();

  ngOnInit(): void {
    this.setColumns();
    this.getData();
  }

  getData(): void {
    const subscription = this.baseApiService.getCompletedTasks().subscribe({
      next: (res) => {
        this.dataSource.set(res);
      },
      error: () => {
        alert('we have an error :(');
      }
    });
    this.subscriptions.add(subscription);
  }

  deleteTask(row: ListModel): void {
    if (row._id) {
      const subscription = this.baseApiService.deleteTask(row._id).subscribe({
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

  setColumns() {
    this.columns.set([
      {
        columnDef: 'title',
        header: 'title',
        cell: (element: TaskModel) => `${element.title}`,
        type: 'string'
      },
      {
        columnDef: 'description',
        header: 'description',
        cell: (element: TaskModel) => `${element.description}`,
        type: 'string'
      },
      {
        columnDef: 'date',
        header: 'date',
        cell: (element: TaskModel) => `${element.date}`,
        type: 'date'
      },
      {
        columnDef: 'actions',
        header: 'actions',
        cell: () => '',
        type: 'template'
      },
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
