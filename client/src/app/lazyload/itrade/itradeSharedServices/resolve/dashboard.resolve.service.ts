import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, concatMap } from 'rxjs';

import { UserDetailsService } from '../services/user.details.service';

@Injectable ({
    providedIn: 'root'
})
export class DashboardResolveService implements Resolve<Observable<any>> {
    constructor (private uds: UserDetailsService) {
        //
    }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Get Access token and refresh token and then only subscribe to Customer Data and Demat holdings
        return this.uds.getUserDetails ()
            .pipe (
                concatMap (() => this.uds.getDematHoldings ())
            )
    }
}
