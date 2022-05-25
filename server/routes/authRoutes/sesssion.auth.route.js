import KoaRouter from 'koa-router';

import env from '../../configs/config.dev.js';

import TokenService from '../../utilities/services/auth/token.security.service.js';
import SessionService from '../../utilities/services/auth/session.crud.service.js';

const router = new KoaRouter ({
    prefix: 'v1'
});

router.get ('/initiateicicilogin', async (ctx, next) => {
    // Session Token Creation with temporary OTP | tidToken - Temporary ID token
    const userAgent = ctx.request.headers['user-agent'];
    const hostName = ctx.request.headers.host;
    const tidRandom = TokenService.generateRandomOTP ();
    const tidToken = TokenService.generateJWTToken ({ tid: tidRandom }, { userAgent, hostName });

    await SessionService.createSession ({ tidToken, userAgent, hostName })
        .then ((dbVal) => {
            // setting cookie for Vathagam App Key (vak)
            ctx.status = 200;
            // aurl: Authentication URL | Auth Server URL
            ctx.cookies.set ('aurl', 'https://api.icicidirect.com/apiuser/login', { httpOnly: false, maxAge: 10*1000, domain: env.domain });
            // vak: Vathagam App Key
            ctx.cookies.set ('vak', env.apike, { httpOnly: false, maxAge: 10*1000, domain: env.domain });
            // tid: Temporary ID - State management to prevent bad user to gain access during login
            ctx.cookies.set ('tid', dbVal.sessionId, { httpOnly: true, maxAge: 3*60*1000, domain: env.domain });
            ctx.body = {
                message: 'Auth initiated'
            };
            next ();
        })
        .catch ((err) => {
            ctx.status = 400;
            ctx.body = {
                errMsg: err.message,
                message: 'We are currently down. Please try after few minutes.'
            };
            next ();
        });
});

router.post ('/authenticated/redirect', async (ctx, next) => {
    // To-do -- Verify is session already active

    await SessionService.saveSession (ctx.request.body)
        .then ((dbVal) => {
            const getEncryptedToken = TokenService.genB64encrypted (dbVal.authId);
            ctx.cookies.set ('east', getEncryptedToken, { httpOnly: true, domain: env.domain }); // east - Encrypted API Session Token
            ctx.status = 302;
            ctx.redirect ('http://localhost:4200/icici/dashboard');
            next ();
        })
        .catch ((err) => {
            ctx.status = 400;
            ctx.body = {
                message: 'We are currently down. Please try after few minutes.'
            };
        });
});

export default router;
