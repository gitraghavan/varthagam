/* Connected route */
// Level 1 route layer to sub routesß

import KoaRouter from 'koa-router';

import authRoute from './routes/authRoutes/sesssion.auth.route.js';
import profileRoute from './routes/profileRoutes/details.js';
import screenerRoutes from './routes/screenerRoutes/chart.service.js';

const router = new KoaRouter ({
    prefix: '/varthagamitrade'
});

router.use ('/oauth/', authRoute.routes (), authRoute.allowedMethods ());
router.use ('/profile/', profileRoute.routes (), profileRoute.allowedMethods ());
router.use ('/screener/', screenerRoutes.routes (), screenerRoutes.allowedMethods ());

export default router;
