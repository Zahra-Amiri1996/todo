import { Component, inject, signal } from '@angular/core';
import { BaseListComponent } from '../../shared/base-list/base-list.component';
import { ColumnModel } from '../../shared/base-list/models/column.model';
import { ListModel } from '../../../models/list.model';
import { BaseApiService } from '../../../services/base-api.service';

@Component({
  selector: 'app-completed-tasks-list',
  imports: [
    BaseListComponent
  ],
  templateUrl: './completed-tasks-list.component.html',
  standalone: true,
  styleUrl: './completed-tasks-list.component.scss'
})
export class CompletedTasksListComponent {
  columns = signal<ColumnModel<ListModel>[]>([]);
  dataSource = signal<ListModel[]>([])
  displayedColumns= signal<string[]>([]);
  baseApiService = inject(BaseApiService);
}
