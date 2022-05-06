import { Routes } from '@angular/router';

import { DashboardComponent } from './icici.index';

export const iciciRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
