import { Routes } from '@angular/router';

import { TradeSession, DashboardComponent,
    ScripChart } from './itrade.index';

import { SessionActivateGuardService, DashboardActivateGuardService,
     DashboardResolveService, ChartResolveService } from './itradeSharedServices';

export const itradeRoutes: Routes = [
    { path: '', component: TradeSession, canActivate: [ SessionActivateGuardService ], children: [
        { path: 'dashboard', component: DashboardComponent, canActivate: [ DashboardActivateGuardService ], resolve: [ DashboardResolveService ] },
        { path: 'chart/:scrip', component: ScripChart, resolve: [ ChartResolveService ] },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]},
    { path: '', redirectTo: '', pathMatch: 'full' }
];
