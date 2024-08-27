import {SECRET_KEY} from "../envs/index.js";
import {Token} from "./token.js";
import {authRouteList} from "./authRouteList.js";
import UserLoginModel from "../models/user/userLoginModel.js";

export async function authenticateRequest(req, res, next) {
    const {originalUrl, headers} = req;
    if (!authRouteList[originalUrl]) {
        return next();
    }
    const authHeader = headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send({statusCode: 401, message: 'unauthorized access'});

    const decryptedToken = await Token.verifyToken(token, SECRET_KEY);
    if (!decryptedToken) {
        return res.status(401).send({statusCode: 401, message: 'token expired'});
    }

    req.user=decryptedToken;
    const {userId} = decryptedToken;
    const userExist = await UserLoginModel.findOne({userId: userId, activeToken: token}, undefined, undefined);

    if(!userExist) return res.status(401).send({statusCode: 401, message: 'unauthorized access'});
    return next();
}