import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';
import { ObservableComponent } from './observable/observable.component';
import { UsagerComponent } from './usager/usager.component';
import { PooComponent } from './POO/poo/poo.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {   path: '',
        component: LoginComponent
    },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    {
        path: 'dashboard/:id',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'observable',
        loadComponent: () => import('./observable/observable.component').then(m => m.ObservableComponent)
    },
    {
        path: 'usager',
        component: UsagerComponent
    },
    {
        path: 'poo',
        component: PooComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    }
];
