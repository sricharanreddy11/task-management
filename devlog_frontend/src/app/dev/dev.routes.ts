import { Routes } from '@angular/router';
import { DevComponent } from './dev.component';

export const routes: Routes = [
    {
        path: '',
        component: DevComponent,
        pathMatch: "full"
    },
];
