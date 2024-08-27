import Joi from 'joi';
import {RegexChecker} from "../../utils/regexChecker.js";

const staffPostSchema = Joi.object({
    firstName: Joi.string().pattern(RegexChecker.USERNAME_REGEX).min(3).max(30).required(),
    lastName: Joi.string().pattern(RegexChecker.USERNAME_REGEX).min(3).max(30).required(),
    email: Joi.string().pattern(RegexChecker.EMAIL_REGEX).email().required(),
    department: Joi.string().required(),
    role: Joi.string().required(),
    gender: Joi.string().required(),
    countryCode: Joi.number().required(),
    phone: Joi.number().required(),
});

const staffFindSchema = Joi.object({
});

class StaffValidator {
    static postValidate(data) {
        return staffPostSchema.validate(data);
    }

    static findValidate(data) {
        return staffFindSchema.validate(data);
    }
}

export default StaffValidator;