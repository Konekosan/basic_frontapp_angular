import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/login/auth.guard';
import { UsagerComponent } from './pages/usager/usager.component';
import { PooComponent } from './pages/POO/poo/poo.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AppHeaderComponent } from './pages/app-header/app-header.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
    {   
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'',
        component: AppHeaderComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'poo',
                component: PooComponent
            },
            {
                path: 'usager',
                component: UsagerComponent
            },
            {
                path: 'admin',
                component: AdminComponent
            },
            {
                path: 'observable',
                loadComponent: () => import('./pages/observable/observable.component').then(m => m.ObservableComponent)
            },
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
];
