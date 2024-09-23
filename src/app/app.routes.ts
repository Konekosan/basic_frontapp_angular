import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';
import { ObservableComponent } from './observable/observable.component';
import { UsagerComponent } from './usager/usager.component';

export const routes: Routes = [
    {   path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard/:id',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'observable',
        component: ObservableComponent
    },
    {
        path: 'usager',
        component: UsagerComponent
    }
];
