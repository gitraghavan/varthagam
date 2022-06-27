import { Component, Input } from '@angular/core';

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

    navigateToChart (e: any) {
        console.log (e);
    }
}
