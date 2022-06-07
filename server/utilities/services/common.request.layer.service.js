/* Common Service Layer
Take in an object with path, method, headers and options */
// Response data is read as chunks and when the data is huge to its previous value as (resdata += d)
// Response end with converting all the data to a JSON format

import https from 'https';

import env from '../../configs/config.dev.js';

import CookieService from './auth/cookie.service.js';
import ChecksumCompute from './auth/checksum.service.js';

export default class CommonServiceLayer {
    static async commonRequest (o) {
        const options = {
            host: env.apiurl,
            path: o.path,
            method: o.method,
            headers: o.headers
        };

        return new Promise (resolve => {
            const req = https.request (options, (res) => {
                let resData = '';
                res.on ('data', (d) => {
                    resData += d;
                });
        
                res.on ('end', async () => {
                    resolve (JSON.parse (resData));
                });
            });
        
            req.on ('error', (err) => {
                console.log (err);
                reject (err);
            });
        
            if (o.reqBody) {
                req.write (o.reqBody);
            }
            req.end ();
        });
    };

    static async reqResGen (o) {
        const reqBody = JSON.stringify (o.reqBody);
        const dant = new Date (); // date and time
        dant.setMilliseconds (0); // Set the last few digits as 0 with regards to milliseconds. Required for any API hitting trading URL
        const time_stamp = dant.toISOString ();

        const sesTok = await CookieService.getSessionUsingCookies (o.reqCookie);
        const checksumToken = ChecksumCompute.constructChecksum (reqBody, time_stamp);

        const path = o.path;
        const method = o.method;
        const headers = {
            'Content-type': 'application/json',
            'Content-Length': Buffer.byteLength (reqBody),
            'X-Checksum': `token ${checksumToken}`,
            'X-Timestamp': time_stamp,
            'X-AppKey': env.apike,
            'X-SessionToken': sesTok.sessionId
        };

        return this.commonRequest ({ path, method, headers, reqBody });
    }
}
