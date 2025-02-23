import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent)
  },
  {
    path: 'completed-task',
    loadComponent: () => import('../components/pages/completed-tasks-list/completed-tasks-list.component').then(c => c.CompletedTasksListComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent)
  }
];
