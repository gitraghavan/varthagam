import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ChartServices } from '../index';

import { StorageServicesLocal } from '../../../../commonServices/index';

@Injectable ({
    providedIn: 'any'
})
export class ChartResolveService implements Resolve<Observable<any>> {
    constructor (private storageServices: StorageServicesLocal,
        private ChartService: ChartServices) {
        //
    }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.ChartService.getHistoricalChart ({ exch: this.storageServices.getSessionStorage ('exch') || 'nse', scrip: route.params['scrip'] });
    }
}
