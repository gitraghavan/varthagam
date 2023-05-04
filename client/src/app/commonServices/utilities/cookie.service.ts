import { Injectable } from '@angular/core';

@Injectable ({
    providedIn: 'root'
})
export class CookieAppService {
    getLoginCookies (): string {
        let allCookies = document.cookie.split ('; ');
        let cookiesObj = this.createCookieObject (allCookies);
        return this.createLoginUrl ([cookiesObj.aurl, encodeURIComponent (cookiesObj.vak)]);
    }

    createCookieObject (d: any): any {
        let cookieArrayObj: any[] = [];
        d.map ((v: any) => {
            let kv = v.split ('=');
            cookieArrayObj[kv[0]] = kv[1];
        });
        return cookieArrayObj;
    }

    createLoginUrl (v: any): string {
        return v.join ('?api_key=');
    }
}
