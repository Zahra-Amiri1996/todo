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
  },
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
  {
    path: 'completed-task',
    loadComponent: () => import('../components/pages/completed-tasks-list/completed-tasks-list.component').then(c => c.CompletedTasksListComponent)
  },
  {
    path: 'another-list',
    loadComponent: () => import('../components/pages/another-list/another-list.component').then(c => c.AnotherListComponent),
  },
  {
    path: 'list-detail',
    loadComponent: () => import('../components/pages/another-list/partial/list-detail/list-detail.component').then(c => c.ListDetailComponent),
  },
  {
    path: 'list-detail/:id',
  loadComponent: () => import('../components/pages/another-list/partial/list-detail/list-detail.component').then(c => c.ListDetailComponent),
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('../components/pages/another-list/partial/tasks/tasks.component').then(c => c.TasksComponent),
  },
  {
    path: '**',
    loadComponent: () => import('../components/pages/daily-task-list/daily-task-list.component').then(c => c.DailyTaskListComponent)
  },
];
