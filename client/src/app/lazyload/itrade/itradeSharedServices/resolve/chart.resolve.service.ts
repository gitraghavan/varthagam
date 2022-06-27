import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ChartServices } from '../index';

@Injectable ({
    providedIn: 'any'
})
export class ChartResolveService implements Resolve<Observable<any>> {
    constructor (private ChartService: ChartServices) {
        //
    }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.ChartService.getHistoricalChart ({ scrip: route.params['scrip'] });
    }
}
