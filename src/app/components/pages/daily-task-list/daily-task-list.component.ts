import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ColumnModel } from '../../../models/column.model';
import { ListModel } from '../../../models/list.model';
import { BaseApiService } from '../../../services/base-api.service';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatButton, MatIconButton } from '@angular/material/button';
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

@Component({
  selector: 'app-daily-task-list',
  imports: [
    MatButton,
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
  ],
  templateUrl: './daily-task-list.component.html',
  standalone: true,
  styleUrl: './daily-task-list.component.scss'
})
export class DailyTaskListComponent implements OnInit, OnDestroy {
  columns = signal<ColumnModel<ListModel>[]>([]);
  dataSource = signal<ListModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'date', 'isMain' ,  'actions']);
  baseApiService = inject(BaseApiService);
  router = inject(Router);
  subscriptions = new Subscription();

  ngOnInit(): void {
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
    const subscription = this.baseApiService.getMainList().subscribe({
      next: (res) => {
        this.dataSource.set([res]);
      },
      error: () => {
        alert('we have an error :(');
      }
    });
    this.subscriptions.add(subscription);
  }

  deleteList(row: ListModel): void {
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

  editList(row: ListModel): void {
    if (row._id) {
      this.router.navigate([ 'task', row._id]).then();
    }
  }

  addList(row: ListModel): void {
    if (row._id) {
      this.router.navigate([ 'task']).then();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
