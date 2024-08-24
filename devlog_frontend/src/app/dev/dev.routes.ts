import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ProjectComponent } from './projects/project/project.component';
import { SettingsComponent } from './settings/settings.component';
import { NoteMakerComponent } from './note-maker/note-maker.component';
import { AssistantComponent } from './assistant/assistant.component';
import { ProfileComponent } from './profile/profile.component';

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
        path: 'projects/:id',
         component: ProjectComponent
    },
    {
        path: 'alerts',
        component: AlertsComponent,
    },
    {
        path: 'note-maker',
        component: NoteMakerComponent,
    },
    {
        path: 'assistant',
        component: AssistantComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'settings',
        component: SettingsComponent,
    },
];
