import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
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
import { ListModel } from '../../../../../models/list.model';
import { BaseApiService } from '../../../../../services/base-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnModel } from '../../../../../models/column.model';
import { TaskModel } from '../../../../../models/task.model';

@Component({
  selector: 'app-tasks',
  imports: [
    DatePipe,
    MatButton,
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
    MatHeaderCellDef,
    MatColumnDef
  ],
  templateUrl: './tasks.component.html',
  standalone: true,
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnDestroy, OnInit {
  baseApiService = inject(BaseApiService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  subscriptions = new Subscription();
  listId = signal('');
  // FOR TABLE
  columns = signal<ColumnModel<TaskModel>[]>([]);
  dataSource = signal<ListModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'date', 'description', 'actions']);

  ngOnInit() {
    this.setColumns();
    this.setListId();
  }

  setListId(): void {
    const listId = this.activatedRoute.snapshot.paramMap.get('id');
    if (listId) {
      this.listId.set(listId);
      this.getData();
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

  getData(): void {
    const subscription = this.baseApiService.getTasksByList(this.listId()).subscribe({
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

  editTask(row: ListModel): void {
    if (row._id) {
      this.router.navigate(['task'], {queryParams: {taskId: this.listId(), listId: this.listId(),}}).then();
    }
  }

  addTask(): void {
    this.router.navigate(['task'], {queryParams: {listId: this.listId()}}).then();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
