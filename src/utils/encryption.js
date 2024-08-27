import crypto from "crypto";

import {ENCRYPTION_KEY} from "../envs/index.js";
import {Logger} from "./logger.js";

const secretKey = Buffer.from(ENCRYPTION_KEY, 'hex');

export class Encryption {
    // Encryption function
      static encrypt(text) {
        try {
            const iv = crypto.randomBytes(16); // Initialization vector
            const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        }
        catch (err){
            Logger.error(err);
            throw new Error('encrypt failed '+err);
        }
    }

    // Decryption function
     static decrypt(text) {
        try {
            const textParts = text.split(':');
            const iv = Buffer.from(textParts[0], 'hex');
            const encryptedText = Buffer.from(textParts[1], 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc',secretKey, iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
        catch (err) {
            Logger.error(err);
            throw new Error('decrypt failed '+err);
        }
    }
}

