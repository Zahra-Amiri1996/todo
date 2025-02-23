import { Routes } from '@angular/router';

export const baseListRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../pages/daily-task-list/daily-task-list.component').then(
        (c) => c.DailyTaskListComponent
      ),
    children: [
      { path: '', redirectTo: 'task', pathMatch: 'full' },
      {
        path: 'task',
        loadComponent: () =>
          import('../../pages//task-detail/task-detail.component').then(
            (c) => c.TaskDetailComponent
          ),
      },
      {
        path: 'task/:id',
        loadComponent: () =>
          import('../../pages//task-detail/task-detail.component').then(
            (c) => c.TaskDetailComponent
          ),
      },
    ],
  },
];
