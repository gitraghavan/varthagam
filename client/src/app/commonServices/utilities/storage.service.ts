import { Injectable } from '@angular/core';

@Injectable ({
    providedIn: 'root'
})
export class StorageServicesLocal {
    setLocalStorage (k: string, v: string) {
        localStorage.setItem (k, v);
    }

    setSessionStorage (k: string, v: string) {
        sessionStorage.setItem (k, v);
    }

    getLocalStorage (k: string) {
        return localStorage.getItem (k);
    }

    getSessionStorage (k: string) {
        return sessionStorage.getItem (k);
    }
}