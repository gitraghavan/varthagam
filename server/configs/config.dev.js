import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config ({ path: 'configs/dev.env' });

const privateKey = fs.readFileSync ('./private.pem', { encoding: 'utf-8' });
const publicKey = fs.readFileSync ('./public.pem', { encoding: 'utf-8' });

const devEnvs = {
    port: process.env.PORT,
    apke: process.env.APP_KEY,
    sk: process.env.SAPI_KEY,
    test_apke: process.env.DEV_TEST_APKE,
    private_key: privateKey,
    public_key: publicKey
};

export default devEnvs;