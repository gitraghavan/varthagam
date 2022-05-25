import { Routes } from '@angular/router';

import { DashboardComponent } from './icici.index';

import { DashboardResolveService } from './iciciSharedServices';

export const iciciRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, resolve: [DashboardResolveService] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
