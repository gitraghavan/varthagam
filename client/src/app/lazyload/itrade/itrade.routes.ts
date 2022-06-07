import { Routes } from '@angular/router';

import { TradeSession, DashboardComponent,
    ScripChart } from './itrade.index';

import { SessionActivateGuardService, DashboardActivateGuardService,
     DashboardResolveService } from './itradeSharedServices';

export const itradeRoutes: Routes = [
    { path: '', component: TradeSession, canActivate: [ SessionActivateGuardService ] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ DashboardActivateGuardService ], resolve: [ DashboardResolveService ] },
    { path: 'scrip/chart', component: ScripChart },
    { path: '', redirectTo: '', pathMatch: 'full' }
];
