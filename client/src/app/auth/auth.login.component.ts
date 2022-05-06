import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../sharedServices/mainSharedServicesIndex';

@Component ({
    selector: 'authLogin',
    templateUrl: './auth.login.component.html',
    styleUrls: ['./auth.login.component.scss']
})
export class AuthLogin implements OnInit {
	constructor (private uas: UserAuthService) {
		//
	}

	ngOnInit (): void {
		//
	}

	iciciBreezeSession () {
		this.uas.userLogin ().subscribe ((d: any) => {
			window.location.href = d;
		});
	}
}