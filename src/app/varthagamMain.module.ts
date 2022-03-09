import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { VarthagamMainRouting } from './mainRoute.routing';
import { VarthagamMain } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		VarthagamMainRouting
	],
	declarations: [
		VarthagamMain
	],
	providers: [],
	bootstrap: [ VarthagamMain ]
})
export class VarthagamMainModule { }
