import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component ({
    selector: 'itrade-header',
    templateUrl: './header.component.html',
    styles: [`
        .va-ic-header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
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
