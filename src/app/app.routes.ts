import { Routes } from '@angular/router';
export const routes: Routes = [
    { 
    path: '', 
    loadComponent: () => import('./components/login/login').then(c => c.Login) 
  },
  {
    path:'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(c =>c.Dashboard)
  },
{
  path:'ticket',
  loadComponent: () => import('./components/my-ticket/my-ticket').then(c =>c.MyTicket)
}
];
