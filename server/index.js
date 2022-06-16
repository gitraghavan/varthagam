/* Index file - Initial server setup */
// Set up Private and Public pem - run TokenService method
// Create dev.env file for DOMAIN, PORT, APP_NAME, API_KEY, API_SECRET, AURL (Auth URL)

import Koa from 'koa';
import KoaBody from 'koa-body';
import { createServer } from "http";

import MongooseClient from 'mongoose';

import env from './configs/config.dev.js';
import connectedRoutes from './connected.routes.js';

const port = env.port;

const app = new Koa ();
const httpServer = createServer (app.callback ());

MongooseClient.connect ('mongodb://localhost/varthagam');
MongooseClient.connection
    .once ('open', ()=> console.log ('Connection opened for Mongo DB with Mongoose Client.'))
    .on ('error', (error) => {
        console.log ('Error: ', error);
    });

app.use (KoaBody ());
app.use (connectedRoutes.routes (), connectedRoutes.allowedMethods ());

httpServer.listen (port, () => {
    console.log (`Application running on http://localhost:${env.port}`);
});
