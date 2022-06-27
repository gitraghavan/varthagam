import { Component } from '@angular/core';
import { LoadingService } from '../../commonServices/index';

@Component ({
    selector: 'loading-modal',
    template: `
        <section class="va-loader" *ngIf="loadingService.loading$ | async">
            <mat-spinner></mat-spinner>
        </section>
        `,
    styles: [`
        .va-loader {
            z-index: 1090;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            background: rgba(0, 0, 0, 0.4);
        }
    `]
})
export class LoadingModal {
    constructor (public loadingService: LoadingService) {
        //
    }
}
