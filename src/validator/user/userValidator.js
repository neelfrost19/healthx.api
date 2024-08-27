import Joi from 'joi';
import {RegexChecker} from "../../utils/regexChecker.js";

const userSchema = Joi.object({
    userName: Joi.string().pattern(RegexChecker.USERNAME_REGEX).min(3).max(30).required(),
    email: Joi.string().pattern(RegexChecker.EMAIL_REGEX).email().required(),
    password: Joi.string().pattern(RegexChecker.PASSWORD_REGEX).min(6).required(),
});

class UserValidator {
    static validate(data) {
        return userSchema.validate(data);
    }
}

export default UserValidator;