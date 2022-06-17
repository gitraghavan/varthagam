import { Component, Input } from '@angular/core';

@Component ({
    selector: 'basic-info',
    templateUrl: './basic.info.component.html',
    styles: [`
        .va-ic-dash-wlcm-txt {
            display: grid;
            grid-template-columns: 1fr;
            padding-bottom: 16px;
        }
        .va-ic-dash-top-details {
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(3, 1fr);

            & > div {
                border-top-width: 4px;
                border-top-style: solid;
                padding-top: 8px;
            }
        }
    `]
})
export class BasicDashboardInfo {
    @Input () profile: any;
    @Input () balance: any;

    totalInvestment: number = 0;
    currentInvestment: number = 0;

    ngOnInit () {
        this.totalInvestment = Number (localStorage.getItem ('tia'));
        this.currentInvestment = Number (localStorage.getItem ('civ')) - Number (localStorage.getItem ('tia'));
    }
}
