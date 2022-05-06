import NodeRSA from 'node-rsa';

// Keypair generated with RSA 512 byte
const key = new NodeRSA ({ b: 512 });

/* ------------------------------------------------ */
// Generate RSA Key pair - Private and Public keys
// After generating the key save the keys in a pem file
const generatePrivateAndPublicKeys = () => {
    key.generateKeyPair ();
    const publicKey = key.exportKey('pkcs8-public-pem');
    const privateKey = key.exportKey('pkcs1-pem');

    fs.writeFileSync ('public.pem', publicKey);
    fs.writeFileSync ('private.pem', privateKey);
}

export default generatePrivateAndPublicKeys;
