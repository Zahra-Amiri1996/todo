import { Component, inject, signal } from '@angular/core';
import { BaseListComponent } from '../../shared/base-list/base-list.component';
import { ColumnModel } from '../../shared/base-list/models/column.model';
import { ListModel } from '../../../models/list.model';
import { BaseApiService } from '../../../services/base-api.service';

@Component({
  selector: 'app-daily-task-list',
  imports: [
    BaseListComponent
  ],
  templateUrl: './daily-task-list.component.html',
  standalone: true,
  styleUrl: './daily-task-list.component.scss'
})
export class DailyTaskListComponent {
  columns = signal<ColumnModel<ListModel>[]>([]);
  dataSource = signal<ListModel[]>([])
  displayedColumns= signal<string[]>([]);
  baseApiService = inject(BaseApiService);
}
