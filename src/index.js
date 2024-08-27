import express from 'express';
import mongoose from 'mongoose';
import {config} from 'dotenv';

import {Logger} from "./utils/logger.js";
import {PORT, DB_URL} from "./envs/index.js";

import {authenticateRequest} from "./auth/middleware.js";

import userRoute from "./routes/userRoute.js";
import userLoginRoute from "./routes/userLoginRoute.js";
import staffRoute from "./routes/staffRoute.js";

config();

//Database connection config
mongoose
    .connect(DB_URL ?? '')
    .then(() => {
        mongoose.syncIndexes().then();
        Logger.info('MongoDB Connected');
    })
    .catch(err => {
        Logger.error('MongoDB Connected' +err);
        throw new Error('Please check mongodb config' +err);
    });

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR, allowFreeInvites, Domain'
    );
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(authenticateRequest);
app.use(userRoute);
app.use(userLoginRoute);
app.use(staffRoute);

app.listen(PORT, () => {
   Logger.info(`Server is running on port ${PORT}`);
});

export {app, mongoose};

