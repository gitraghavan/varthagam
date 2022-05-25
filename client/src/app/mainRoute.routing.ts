import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLogin } from './index';

const mainRoutes: Routes = [
	{ path: 'login', component: AuthLogin },
	{ path: 'itrade', loadChildren: () => import ('./lazyload/itrade/itrade.app.module').then(m => m.ItradeAppModule) },
	{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot (mainRoutes) ],
	exports: [ RouterModule ]
})
export class VarthagamMainRouting { }
