import { Component, ViewEncapsulation } from '@angular/core';

@Component ({
    selector: 'itrade-session',
    template: `
        <main class="va-ic-main-wrapper" [ngClass]="{ 'dark-theme' : isDarkMode }">
            <div class="va-ic-wrapper-container va-ic-fit-content-last">
                <itrade-header (darkModeEve)="themeSelector ($event)"></itrade-header>
                <router-outlet></router-outlet>
            </div>
        </main>
    `,
    styles: [`
        /* Global Varthagam Styles handled with encapsulation - set to none */
        .va-ic-main-wrapper {
            display: block;
            width: 100%;
            height: 100%;
        }
        .va-ic-wrapper-container {
            height: 100%;
            display: grid;
            grid-template-rows: repeat(1, auto) 1fr;
        }
        .va-ic-fit-content-last {
            display: flex;
            flex-direction: column;
            height: 100vh;

            & > :last-child {
                flex-grow: 1;
            }
        }
        .va-ic-sec-main {
            display: grid;
            justify-content: center;
            padding: 24px;
        }
        .va-ic-dash-wrapper {
            width: 600px;
        }
        .va-item-split-end {
            display: flex;
            justify-content: space-between;
            gap: 16px;
        }
        .va-ic-no-data-txt {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class TradeSession {
    isDarkMode: boolean = true;

    themeSelector (v: any) {
        this.isDarkMode = v;
    }
}
