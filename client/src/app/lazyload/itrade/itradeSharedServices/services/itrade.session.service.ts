import { Injectable } from '@angular/core';

import { Observable,
    map } from 'rxjs';

import { CustomerDetailsService } from '../index';

@Injectable ()
export class SessionService {
    constructor (private cds: CustomerDetailsService) {
        //
    }

    activateSession (): Observable <boolean> {
        return this.cds.getCustomerDetails ()
            .pipe (
                map ((d: any) => {
                    if (d) return true;
                    return false;
                })
            )
    }

    validateSession () {
        //
    }

    deactivateSession () {
        //
    }
}
