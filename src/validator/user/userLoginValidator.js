import Joi from 'joi';
import {RegexChecker} from "../../utils/regexChecker.js";

const userSchema = Joi.object({
    email: Joi.string().pattern(RegexChecker.EMAIL_REGEX).email().required(),
    password: Joi.string().pattern(RegexChecker.PASSWORD_REGEX).min(6).optional(),
});

class UserLoginValidator {
    static validate(data) {
        return userSchema.validate(data);
    }
}

export default UserLoginValidator;