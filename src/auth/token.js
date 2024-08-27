import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../envs/index.js";
import {Logger} from "../utils/logger.js";

// Function to create a JWT
export class Token{
    static createToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    }

// Function to verify a JWT
    static verifyToken(token) {
        try {
            return  jwt.verify(token, SECRET_KEY);
        } catch (err) {
            Logger.error('Invalid token', err.message);
        }
    }
}

