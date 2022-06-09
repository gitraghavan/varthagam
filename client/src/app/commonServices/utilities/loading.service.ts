import { Injectable } from '@angular/core';

import { Observable, of, tap,
    BehaviorSubject,
    concatMap, finalize } from 'rxjs';

@Injectable ()
export class LoadingService {
    private loadingSubject$ = new BehaviorSubject<boolean> (false);

    loading$: Observable<boolean> = this.loadingSubject$.asObservable ();

    showLoaderUntilCompleted (obs$: Observable<any>): Observable<boolean> {
        return of (null)
            .pipe (
                tap (() => this.showLoader ()),
                concatMap (() => obs$),
                finalize (() => this.stopLoader ())
            )
    }

    showLoader (): void {
        this.loadingSubject$.next (true);
    }

    stopLoader (): void {
        this.loadingSubject$.next (false);
    }
}
