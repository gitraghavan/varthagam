// Core Dependencies
import KoaRouter from 'koa-router';

// Environment Reference
import env from '../../configs/config.dev.js';

// Mongo DB Collection Service
import UserSessionCollection from '../../utilities/collections/session.collection.js';

// Dependency Service Layers
import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';
import CookieService from '../../utilities/services/auth/cookie.service.js';
import TokenService from '../../utilities/services/auth/token.security.service.js';

// Sub-Routes
import userFunds from './funds.js';

// Router Configurations | API Configurations
const router = new KoaRouter ({
    prefix: 'customer'
});

/* Funds Route */
router.use ('/funds', userFunds.routes (), userFunds.allowedMethods ())

router.get ('/details', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        // check if the cookie exist | Check the timestamp of the cookie and compare, if above 3 minutes then make session invalid
        const cookieVal = CookieService.cookieStringToJSON (ctx.request.headers.cookie);
        const decryptedValue = TokenService.convertB64Decryt (cookieVal.east);

        const reqBody =  JSON.stringify ({
            SessionToken: decryptedValue,
            AppKey: env.apike
        });

        const path = '/breezeapi/api/v1/customerdetails';
        const method = 'GET';
        const headers = {
            'Content-type': 'application/json',
            'Content-Length': Buffer.byteLength (reqBody)
        };

        // To-do - Catch Error of Request service
        const res = await CommonServiceLayer.commonRequest ({ path, method, headers, reqBody });

        // To-do - Catch Error of DB service
        await UserSessionCollection.findOneAndUpdate ({ authId: decryptedValue }, { sessionId: res.Success.session_token }, { new: true, upsert: true })
            .then ((dbVal) => {
                delete res.Success.session_token;

                ctx.status = res.Status;
                ctx.body = res.Success;
                return next ();
            });
    } else {
        // Redirect user to logout screen
        ctx.status = 400;
        ctx.message = 'User session invalid. Please try again.';
        return next ();
    }
});

router.get ('/dematholdings', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = {};
        const reqCookie = ctx.request.header.cookie;
        const path = '/breezeapi/api/v1/dematholdings';
        const method = 'GET';

        const res = await CommonServiceLayer.reqResGen ({ reqBody, reqCookie, path, method });

        ctx.body = res.Success;
        ctx.status = res.Status;
        return next ();
    };
    // No cookies logout user
    ctx.status = 200;
    return next ();
});

export default router;