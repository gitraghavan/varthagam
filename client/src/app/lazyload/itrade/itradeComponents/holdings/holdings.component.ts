import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageServicesLocal } from '../../../../commonServices/index';

@Component ({
    selector: 'itrade-holdings',
    templateUrl: './holdings.component.html',
    styles: [`
        .va-ic-hld-table {
            & .va-ic-table-title {
                font-weight: bold;
                text-transform: uppercase;
                border-bottom-width: 2px;
                border-bottom-style: solid;
            }

            & .va-ic-table-list {
                cursor: pointer;
            }

            & div {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
                align-items: center;
                padding: 16px 0;

                & ~ div ~ div {
                    border-width: 1px 0 0;
                    border-style: solid;
                }

                & p:last-child {
                    text-align: right;
                    justify-self: end;
                }

                & > p {
                    display: flex;
                    flex-direction: row;
                    align-items: baseline;
                    gap: 8px;
                }
            }
        }
    `]
})
export class UserHoldings {
    @Input () holdingsTitle: any;
    @Input () holdings: any;

    constructor (private route: Router, private activatedRoute: ActivatedRoute,
        private storageServices: StorageServicesLocal) {
        //
    }

    navigateToChart (e: any) {
        this.storageServices.setSessionStorage ('exch', e.exchange_code);
        this.route.navigate (['../chart', e.stock_code], {relativeTo: this.activatedRoute});
    }
}
