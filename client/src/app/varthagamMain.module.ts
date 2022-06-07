import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './varthagam.material.module';
import { SharedModule } from './shared.module';

import { VarthagamMainRouting } from './mainRoute.routing';

import { VarthagamMain,
	AuthLogin } from './index';

import { AuthInterceptorService } from './commonServices/index';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule, FormsModule,
		VarthagamMainRouting,
		MaterialModule,
		SharedModule
	],
	declarations: [
		VarthagamMain,
		AuthLogin
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}
	],
	bootstrap: [ VarthagamMain ]
})
export class VarthagamMainModule { }
