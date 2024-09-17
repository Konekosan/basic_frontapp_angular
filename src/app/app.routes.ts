import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';
import { CrudComponent } from './crud/crud.component';
import { ObservableComponent } from './observable/observable.component';

export const routes: Routes = [
    {   path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'crud',
        component: CrudComponent
    },
    {
        path: 'observable',
        component: ObservableComponent
    }
];
