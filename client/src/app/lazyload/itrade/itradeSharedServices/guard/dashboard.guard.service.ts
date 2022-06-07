import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, map } from 'rxjs';

import { CustomerDetailsService } from '../index';

@Injectable ()
export class DashboardActivateGuardService implements CanActivate {
    constructor (private router: Router, private activatedRoute: ActivatedRoute,
        private cds: CustomerDetailsService) {
        //
    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.cds.profileData
            .pipe (
                map ((d: any) => {
                    if (!d) {
                        this.router.navigate (['itrade'], { relativeTo: this.activatedRoute });
                        return false;
                    }
                    return true;
                })
            );
    }
}
