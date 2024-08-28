import {SECRET_KEY} from "../envs/index.js";
import {Token} from "./token.js";
import {authRouteList} from "./authRouteList.js";
import UserLoginModel from "../models/user/userLoginModel.js";
import userModel from "../models/user/userModel.js";
import mongoose from "mongoose";
import staffModel from "../models/staff/staffModel.js";

export async function authenticateRequest(req, res, next) {
    const {originalUrl, headers} = req;

    const modifiedUrl = `/${originalUrl.split('/')[1]}`;

    if (!authRouteList[modifiedUrl]) {
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

    let userData = await userModel.aggregate([
        {
            $match: {_id: new mongoose.Types.ObjectId(userId)}
        },
        {
            $lookup: {
                from: 'roles',
                let: {roleId: '$roleId',},
                pipeline: [
                    {
                        $match: {
                            $expr:
                                {
                                    $eq: ['$_id', '$$roleId'],
                                },
                        },
                    },
                    {
                        $lookup: {
                            from: 'permissions',
                            let: {permissionId: '$permissionId',},
                            pipeline: [
                                {
                                    $match: {
                                        $expr:
                                            {
                                                $eq: ['$_id', '$$permissionId'],
                                            },
                                    },
                                },
                            ],
                            as: 'permission',
                        }
                    },
                ],
                as: 'role'
            }
        },
    ]);
    if(!userData.length){
        userData = await staffModel.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(userId)}
            },
            {
                $lookup: {
                    from: 'roles',
                    let: {roleId: '$roleId',},
                    pipeline: [
                        {
                            $match: {
                                $expr:
                                    {
                                        $eq: ['$_id', '$$roleId'],
                                    },
                            },
                        },
                        {
                            $lookup: {
                                from: 'permissions',
                                let: {permissionId: '$permissionId',},
                                pipeline: [
                                    {
                                        $match: {
                                            $expr:
                                                {
                                                    $eq: ['$_id', '$$permissionId'],
                                                },
                                        },
                                    },
                                ],
                                as: 'permission',
                            }
                        },
                    ],
                    as: 'role'
                }
            },
        ]);
        const {firstName, lastName} = userData[0];
        userData[0].userName = `${firstName} ${lastName}`;
    }

    console.log(userData);

    const userPermissionData = userData[0].role[0].permission[0];
    req.fullUserData=userData[0];

    const method = {
        GET: "readService",
        POST: "createService",
        PATCH: "updateService",
        PUT: "updateService",
        DELETE: "deleteService",
    }

    if(!userPermissionData[method[req.method]]) {
        return res.status(401).send({statusCode: 401, message: 'service not allowed'});
    }

    if(!userExist) return res.status(401).send({statusCode: 401, message: 'unauthorized access'});
    return next();
}