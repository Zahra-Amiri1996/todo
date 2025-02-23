import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BaseListComponent } from '../../shared/base-list/base-list.component';
import { ColumnModel } from '../../shared/base-list/models/column.model';
import { ListModel } from '../../../models/list.model';
import { BaseApiService } from '../../../services/base-api.service';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-task-list',
  imports: [
    BaseListComponent,
    RouterOutlet
  ],
  templateUrl: './daily-task-list.component.html',
  standalone: true,
  styleUrl: './daily-task-list.component.scss'
})
export class DailyTaskListComponent implements OnInit, OnDestroy {
  columns = signal<ColumnModel<ListModel>[]>([]);
  dataSource = signal<ListModel[]>([]);
  displayedColumns = signal<string[]>(['title', 'description', 'date', 'actions']);
  baseApiService = inject(BaseApiService);
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
        columnDef: 'description',
        header: 'description',
        cell: (element: ListModel) => `${element.description}`,
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

  getData(): void {
    const subscription = this.baseApiService.getAllTasks().subscribe({
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

  editTask(row: ListModel): void {
    // if (row._id) {
    //   const subscription = this.baseApiService.get(row._id).subscribe({
    //     next: () => {
    //       this.getData();
    //     },
    //     error: () => {
    //       alert('we have an error :(');
    //     }
    //   });
    //   this.subscriptions.add(subscription);
    // }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
