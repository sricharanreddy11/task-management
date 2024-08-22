import { Routes } from '@angular/router';
import { routes as authRoutes } from './authenticator/authenticator.routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { AuthGuard } from './authenticator/authenticator.guard';
import { AppGuard } from './app.guard';
import { DevComponent } from './dev/dev.component';
import { routes as DevRoutes } from './dev/dev.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dev',
        pathMatch: "full"
    },
    {
        path: 'auth',
        component: AuthenticatorComponent,
        children: authRoutes,
        canActivate: [AuthGuard]
    },
    {
        path: 'dev',
        component: DevComponent,
        children: DevRoutes,
        canActivate: [AppGuard]
    },
    { 
        path: '**', 
        component: PageNotFoundComponent
    }
];
