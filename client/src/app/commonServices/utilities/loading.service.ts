import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable ()
export class LoadingService {
    private loadingSubject$ = new BehaviorSubject<boolean> (false);

    loading$: Observable<boolean> = this.loadingSubject$.asObservable ();

    showLoaderUntilCompleted (v: Observable<boolean>): Observable<boolean> {
        return of (true);
    }

    showLoader (): void {
        this.loadingSubject$.next (true);
    }

    stopLoader (): void {
        this.loadingSubject$.next (false);
    }
}
