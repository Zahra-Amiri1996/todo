import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BaseListComponent } from '../../shared/base-list/base-list.component';
import { ColumnModel } from '../../shared/base-list/models/column.model';
import { ListModel } from '../../../models/list.model';
import { BaseApiService } from '../../../services/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed-tasks-list',
  imports: [
    BaseListComponent
  ],
  templateUrl: './completed-tasks-list.component.html',
  standalone: true,
  styleUrl: './completed-tasks-list.component.scss'
})
export class CompletedTasksListComponent implements OnInit, OnDestroy {
  columns = signal<ColumnModel<ListModel>[]>([]);
  dataSource = signal<ListModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'description', 'date', 'actions']);
  baseApiService = inject(BaseApiService);
  subscriptions = new Subscription();
  http = inject(HttpClient);

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
        columnDef: 'actions',
        header: 'actions',
        cell: () => '',
        type: 'template'
      },
    ]);
  }

  viewTask(task: ListModel): void {
    // todo something
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.setColumns();
    this.getData();
  }
}
