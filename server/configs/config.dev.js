import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config ({ path: './env/dev.env' });

const privateKey = fs.readFileSync ('./env/private.pem', { encoding: 'utf-8' });
const publicKey = fs.readFileSync ('./env/public.pem', { encoding: 'utf-8' });

const devEnvs = {
    domain: process.env.DOMAIN,
    port: process.env.PORT,
    apike: process.env.API_KEY,
    apisec: process.env.API_SECRET,
    private_key: privateKey,
    public_key: publicKey,
    apiurl: process.env.API_URL
};

export default devEnvs;