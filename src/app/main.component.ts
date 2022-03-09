import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	<section>
		<div>
			<input type="text" placeholder="Enter username">
			<input type="password" placeholder="Enter password">
		</div>
	</section>
	`
})
export class VarthagamMain {
	title = 'varthagam';
}
