import { Encryption } from "../../utils/encryption.js";
import { RegexChecker } from "../../utils/regexChecker.js";
import { Token } from "../../auth/token.js";

import UserLoginModel from "../../models/user/userLoginModel.js";
import UserModel from "../../models/user/userModel.js";

class UserAuthService {
    static async getUserLogin(user) {
        const { password, email } = user;

        if (!RegexChecker.checkEmail(email) || !RegexChecker.passwordChecker(password)) {
            return { status: 200, message: 'Bad regex email or password' };
        }

        const userDetails = await UserModel.find({ email }, undefined, undefined);
        if (!userDetails[0]) {
            return { status: 200, message: 'User does not exist' };
        }

        const { _id, userName, password: saltPassword } = userDetails[0];
        if (password !== Encryption.decrypt(saltPassword)) {
            return { status: 200, message: 'Password is incorrect' };
        }

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

export default UserAuthService;
