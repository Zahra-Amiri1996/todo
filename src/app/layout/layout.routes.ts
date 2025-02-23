import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent)
  },
  {
    path: 'complete-task',
    loadComponent: () => import('./components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent)
  },
];
