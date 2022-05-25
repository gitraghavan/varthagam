import NodeRSA from 'node-rsa';
import CryptoJS from 'crypto-js';
import jsonWebToken from 'jsonwebtoken';

import env from '../../../configs/config.dev.js';

// Keypair generated with RSA 512 byte
const key = new NodeRSA ({ b: 512 });

export default class TokenService {
    /* ------------------------------------------------ */
    // Generate RSA Key pair using Node RSA - Private and Public keys
    // After generating the key save the keys in a pem file
    static generatePrivateAndPublicKeysRSA () {
        key.setOptions ({ encryptionScheme: 'pkcs1_oaep' });
        key.generateKeyPair ();
        const publicKey = key.exportKey('pkcs8-public-pem');
        const privateKey = key.exportKey('pkcs1-pem');
    
        fs.writeFileSync ('public.pem', publicKey);
        fs.writeFileSync ('private.pem', privateKey);
    };

    /* ------------------------------------------------ */
    // Encrypt and Decrypt values using crypto-js
    static genB64encrypted (d) {
        const encrypted = CryptoJS.AES.encrypt (d, env.private_key).toString ();
        return encrypted;
    }

    static convertB64Decryt (d) {
        const decrypted = CryptoJS.AES.decrypt (d, env.private_key);
        const tokenToUTF = decrypted.toString (CryptoJS.enc.Utf8);
        return tokenToUTF;
    }

    /* ------------------------------------------------ */
    // Create JSON Web Token - Common method
    static generateJWTToken (payload, opt) {
        const jwtToken = jsonWebToken.sign ( payload, env.private_key, { audience: opt.hostName, issuer: 'varthagam' });
        return jwtToken;
    };

    static verifyJWTToken (t) {
        jsonWebToken.verify (t, env.private_key, { audience: d.hostName, issuer: 'varthagam' });
    }

    /* ------------------------------------------------ */
    // 6 digit random OTP
    static generateRandomOTP () {
        const otpToken = (Math.floor (Math.random () * (999999 - 100000 + 1)) + 100000);
        return otpToken;
    };
}
