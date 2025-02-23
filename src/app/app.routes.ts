import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    loadChildren: () => import('./layout/layout.routes').then(c => c.layoutRoutes)
  },
];
