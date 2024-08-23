import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { AlertsComponent } from './alerts/alerts.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "full"
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'tasks',
        component: TasksComponent,
    },
    {
        path: 'projects',
        component: ProjectsComponent,
    },
    {
        path: 'alerts',
        component: AlertsComponent,
    }
];
