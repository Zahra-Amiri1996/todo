import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () => import('../components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent),
    children: [
      {
        path: 'task',
        loadComponent: () =>
          import('../components/pages/task-detail/task-detail.component').then(
            (c) => c.TaskDetailComponent
          ),
      },
      {
        path: 'task/:id',
        loadComponent: () =>
          import('../components/pages/task-detail/task-detail.component').then(
            (c) => c.TaskDetailComponent
          ),
      },
    ],
  },
  {
    path: 'completed-task',
    loadComponent: () => import('../components/pages/completed-tasks-list/completed-tasks-list.component').then(c => c.CompletedTasksListComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent)
  },
];
