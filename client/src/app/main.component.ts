import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	<loading-modal></loading-modal>
	<router-outlet></router-outlet>
	`,
})
export class VarthagamMain {
	title = 'varthagam';
}
