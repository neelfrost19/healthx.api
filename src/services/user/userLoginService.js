import { Encryption } from "../../utils/encryption.js";
import { Token } from "../../auth/token.js";

import UserLoginModel from "../../models/user/userLoginModel.js";
import UserModel from "../../models/user/userModel.js";
import StaffModel from "../../models/staff/staffModel.js";

class UserAuthService {
    static async getUserLogin(user) {
        try{
            const { password='', email } = user;

            let {loginType = ''} = user;

            let userDetails;

            userDetails = await UserModel.findOne({email}, undefined, undefined);

            if(!password){
                if(userDetails){
                    return {loginType: 'master'};
                }
                else{
                    loginType='staff';
                    userDetails = await StaffModel.findOne({email}, undefined, undefined);
                }
            }

            if (!userDetails) {
                return { status: 500, message: 'User does not exist' };
            }

            console.log(userDetails);

            const { _id, userName, firstName, lastName } = userDetails;

            if(loginType === 'master'){

                const {password: saltPassword} = userDetails;

                if (password !== Encryption.decrypt(saltPassword)) {
                    return { status: 401, message: 'Password is incorrect' };
                }
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
                return { token, userName };
            }

            await UserLoginModel.create(userLoginPayload, undefined);
            return { status: 200, token, userName };
        }
        catch(error){
            return { status: 500, message: error.message };
        }
    }
}

export default UserAuthService;
