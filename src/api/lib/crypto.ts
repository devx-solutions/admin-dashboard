import * as AES from 'crypto-js/aes';
import * as enc from 'crypto-js/enc-utf8';
import debug from './logger';
import env from './env';

class Security {

    // private instance: Security;

    public encrypt(data: Object, key: string = 'default'): string {
        if (key.localeCompare('default') === 0) {
            key = env.getAppInfo().key;
        }
        if (!(key && key.length && key.length >= 8)) {
            debug('You need to specify a key which has minimum 8 characters long');
            return null;
        }
        if (Object.keys(data).length > 0) {
            let cipherText = AES.encrypt(JSON.stringify(data), key).toString() + this.postfixEncryption(env.getAppInfo().postfixLength);
            return cipherText;
        }
    }

    public decrypt(cipherText: string, key: string = 'default'): Object {
        if (key.localeCompare('default') === 0) {
            key = env.getAppInfo().key;
        }
        if (!(key && key.length && key.length >= 8)) {
            debug('You need to specify a key which has minimum 8 characters long');
            return null;
        }
        if (cipherText && cipherText.length && cipherText.length > 0) {

            return JSON.parse(AES.decrypt(this.removePostfixEncryption(cipherText), key).toString(enc));
        }
    }

    public postfixEncryption(length: number): string {
        const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let postfix = '';
        for (let i = 0; i < length; i++) {
            postfix += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return postfix;
    }

    public removePostfixEncryption(cipherText: string, length: number = undefined): string {
        if (cipherText && cipherText != '' && cipherText.length > 0) {
            let decryptionText = cipherText.slice(0, length);
            return decryptionText;
        }
        return cipherText;
    }
}

export default new Security();