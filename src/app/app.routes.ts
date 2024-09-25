import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';
import { ObservableComponent } from './observable/observable.component';
import { UsagerComponent } from './usager/usager.component';
import { PooComponent } from './POO/poo/poo.component';
import { AdminComponent } from './admin/admin.component';
import { AppHeaderComponent } from './app-header/app-header.component';
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
                loadComponent: () => import('./observable/observable.component').then(m => m.ObservableComponent)
            },
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
];
