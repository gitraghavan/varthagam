import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<ng-component [ngClass]="{ 'dark-theme' : isDarkTheme }">
			<loading-modal></loading-modal>
			<router-outlet></router-outlet>
		</ng-component>
	`,
})
export class VarthagamMain {
	title = 'varthagam';
	isDarkTheme = false;
}
