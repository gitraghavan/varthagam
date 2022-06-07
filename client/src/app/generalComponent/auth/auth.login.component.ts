import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs';

import { UserAuthService } from '../../sharedServices';
import { LoadingService } from '../../commonServices/index';

@Component ({
    selector: 'authLogin',
    templateUrl: './auth.login.component.html',
    styleUrls: ['./auth.login.component.scss']
})
export class AuthLogin implements OnInit {
	constructor (private uas: UserAuthService, private loadingService: LoadingService) {
		//
	}

	ngOnInit (): void {
		//
	}

	iciciBreezeSession () {
		this.loadingService.showLoader ();
		this.uas.userLogin ()
			.pipe (
				finalize (() => this.loadingService.stopLoader ())
			)
			.subscribe ((d: any) => {
				window.location.href = d;
			});
	}
}