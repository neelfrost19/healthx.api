import {config} from 'dotenv';
config();

export const {
    PORT,
    DB_URL,
    ENCRYPTION_KEY,
    SECRET_KEY,
    MONGODB_URL,
    DATABASE,
} = process.env;
