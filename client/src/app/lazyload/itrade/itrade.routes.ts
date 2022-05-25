import { Routes } from '@angular/router';

import { DashboardComponent } from './itrade.index';

import { DashboardResolveService } from './itradeSharedServices';

export const itradeRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, resolve: [DashboardResolveService] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
