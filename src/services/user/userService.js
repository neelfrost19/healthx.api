import { Encryption } from "../../utils/encryption.js";
import { RegexChecker } from "../../utils/regexChecker.js";

import UserModel from "../../models/user/userModel.js";
import {Token} from "../../auth/token.js";
import UserLoginModel from "../../models/user/userLoginModel.js";
import roleModel from "../../models/role/roleModel.js";


class UserService {
    static async getUser(id) {
        return UserModel.findById(id, undefined, undefined);
    }

    static async createUser(user) {
        const { email, password } = user;
        user.password = Encryption.encrypt(password);
        const existingUser = await UserModel.findOne({email}, undefined, undefined);
        if (existingUser) {
            return { status: 500, message: 'User already exists' };
        }
        const roleData = await roleModel.findOne({roleName: "Admin"}, undefined, undefined);

        if(!roleData){
            return { status: 500, message: 'Admin role does not exist' };
        }

        const {_id: roleId} = roleData;

        user.roleId = roleId;

        const userData = await UserModel.create(user, undefined);
        const { _id, userName } = userData;

        const userPayload = {
            userId: _id,
            userName
        };

        const token = Token.createToken(userPayload);
        const userLoginPayload = {
            userId: _id,
            activeToken: token
        };

        const existingToken = await UserLoginModel.findOne({ userId: _id }, undefined, undefined);
        if (existingToken) {
            const { _id: existingTokenId } = existingToken;
            await UserLoginModel.findByIdAndUpdate({ _id: existingTokenId }, { activeToken: token }, undefined);
            return { token };
        }

        await UserLoginModel.create(userLoginPayload, undefined);
        return { token };
    }
}

export default UserService;
