import * as AES from 'crypto-js/aes'
import debug from './logger';
import env from './env';

class Security {

    private instance: Security;

    public encrypt(data: string, key: string = 'default'): string {
        if (key.localeCompare('default') === 0) {
            key = env.getAppInfo().key;
        }
        if (!(key && key.length && key.length >= 8)) {
            debug('You need to specify a key which has minimum 8 characters long');
            return null;
        }
        if (data && data.length && data.length > 0) {
            let cipherText = AES.encrypt(JSON.stringify(data), key).toString();
            debug(cipherText);
            cipherText.concat(this.prefixEncryption());
            debug(cipherText);
            return cipherText;
        }

    }

    private prefixEncryption(): string {
        if (env.getAppInfo() && env.getAppInfo().prefix && env.getAppInfo().prefix.length && env.getAppInfo().prefix.length > 1) {
            return AES.encrypt(env.getAppInfo().prefix, env.getAppInfo().key).toString();
        }
    }
}

export default new Security();