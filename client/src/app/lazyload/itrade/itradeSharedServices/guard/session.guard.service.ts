import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable, map } from 'rxjs';

import { SessionService } from '../index';

@Injectable ()
export class SessionActivateGuardService implements CanActivate {
    constructor (private router: Router, private activatedRoute: ActivatedRoute,
        private sesService: SessionService) {
        //
    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // To-do: Check if profiledata already exist in CustomerDetailsService and navigate accordingly
        return this.sesService.activateSession ()
            .pipe (
                map ((d: any) => {
                    if (!d) {
                        this.router.navigate (['login'], { relativeTo: this.activatedRoute });
                        return false;
                    }
                    this.router.navigate (['itrade', 'dashboard'], { relativeTo: this.activatedRoute });
                    return true;
                })
            );
    }
}
