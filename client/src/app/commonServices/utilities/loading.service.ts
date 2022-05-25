import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable ()
export class LoadingService {
    loadingSubject$ = new BehaviorSubject (true);

    loading$ = this.loadingSubject$.asObservable ();

    loadingOn (): void {
        this.loadingSubject$.next (true);
    }

    loadingOff (): void {
        this.loadingSubject$.next (false);
    }
}
