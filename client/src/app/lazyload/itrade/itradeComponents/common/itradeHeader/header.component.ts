import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component ({
    selector: 'itrade-header',
    templateUrl: './header.component.html',
    styles: [`
        .va-ic-header-container {
            height: 50px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            align-items: center;
            padding: 8px 24px;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

            & > div {
                display: flex;
                justify-content: center;

                & > h1, & > p {
                    cursor: pointer;
                }
            }
            & > div:first-child {
                justify-content: start;
            }
            & > div:last-child {
                gap: 16px;
                justify-content: end;
                align-items: center;
            }
        }
        .va-ic-header-link {
            display: flex;
            list-style: none;
            gap: 16px;
            align-items: center;

            & > li {
                padding: 8px;
                cursor: pointer;
            }
        }
    `]
})
export class HeaderComponent {
    @Output () darkModeEve = new EventEmitter <boolean> ();

    themeControl: FormControl = new FormControl (true);

    ngOnInit () {
        this.themeControl.valueChanges.subscribe ((v: boolean) => {
            this.darkModeEve.emit (v);
        });
    }
}
