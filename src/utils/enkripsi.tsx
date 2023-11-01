import criptojs from 'crypto-js';
import { key_enc } from './config';
const aesEnkripsi = (text: string): string => {
    const c = criptojs.AES.encrypt(text, key_enc).toString();
    return c;
}

const aesDenckripsi = (hash: string): string => {

    const c = criptojs.AES.decrypt(hash, key_enc);
    const a = (c.toString(criptojs.enc.Utf8)).toString();
    return a;
}

export { aesEnkripsi, aesDenckripsi }