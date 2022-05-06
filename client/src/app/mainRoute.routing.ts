import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLogin } from './index';

const mainRoutes: Routes = [
	{ path: 'login', component: AuthLogin },
	{ path: 'icici', loadChildren: () => import ('./lazyload/icici/icici.app.module').then(m => m.ICICIAppModule) },
	{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot (mainRoutes) ],
	exports: [ RouterModule ]
})
export class VarthagamMainRouting { }
