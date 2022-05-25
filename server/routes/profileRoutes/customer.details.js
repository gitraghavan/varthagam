import KoaRouter from 'koa-router';

import env from '../../configs/config.dev.js';

import UserSessionCollection from '../../utilities/collections/session.collection.js';

import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';
import CookieService from '../../utilities/services/auth/cookie.service.js';
import TokenService from '../../utilities/services/auth/token.security.service.js';
import ChecksumCompute from '../../utilities/services/auth/checksum.service.js';

const router = new KoaRouter ({
    prefix: 'user'
});

router.get ('/customer/details', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        // check if the cookie exist | Check the timestamp of the cookie and compare, if above 3 minutes then make session invalid
        const cookieVal = CookieService.cookieStringToJSON (ctx.request.headers.cookie);
        const decryptedValue = TokenService.convertB64Decryt (cookieVal.east);

        await UserSessionCollection.findOne ({ authId: decryptedValue })
            .then (async (d) => {
                const reqBody =  JSON.stringify ({
                    SessionToken: d.authId,
                    AppKey: env.apike
                });

                const options = {
                    host: 'api.icicidirect.com',
                    path: '/breezeapi/api/v1/customerdetails',
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Content-Length': Buffer.byteLength (reqBody)
                    }
                };

                const res = await CommonServiceLayer.commonRequest ({ options, reqBody });
                await UserSessionCollection.findOneAndUpdate ({ authId: d.authId }, { sessionId: res.Success.session_token }, { new: true, upsert: true })
                    .then ((dbVal) => {
                        delete res.Success.session_token;
                        // console.log (res.Success);
                        ctx.status = res.Status;
                        ctx.body = res.Success;
                        return next ();
                    })
            });
        ctx.status = 200;
    } else {
        // Redirect user to logout screen
        ctx.status = 400;
        ctx.message = 'User session invalid. Please try again.';
        return next ();
    }
});

router.get ('/customer/dematholdings', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = JSON.stringify ({});
        const dant = new Date ();
        dant.setMilliseconds (0)
        const time_stamp = dant.toISOString ();

        const sesTok = await CookieService.getSessionUsingCookies (ctx.request.header.cookie);
        const checksumToken = ChecksumCompute.constructChecksum (reqBody, time_stamp);
        
        const options = {
            host: 'api.icicidirect.com',
            path: '/breezeapi/api/v1/dematholdings',
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Content-Length': Buffer.byteLength (reqBody),
                'X-Checksum': `token ${checksumToken}`,
                'X-Timestamp': time_stamp,
                'X-AppKey': env.apike,
                'X-SessionToken': sesTok.sessionId
            }
        };

        const res = await CommonServiceLayer.commonRequest ({ options, reqBody });

        ctx.body = res.Success;
        ctx.status = res.Status;
        return next ();
    };
    // No cookies logout user
    ctx.status = 200;
    return next ();
});

export default router;