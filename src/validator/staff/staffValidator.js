import Joi from 'joi';
import {RegexChecker} from "../../utils/regexChecker.js";

const staffPostSchema = Joi.object({
    firstName: Joi.string().pattern(RegexChecker.USERNAME_REGEX).min(3).max(30).required(),
    lastName: Joi.string().pattern(RegexChecker.USERNAME_REGEX).min(3).max(30).required(),
    email: Joi.string().pattern(RegexChecker.EMAIL_REGEX).email().required(),
    department: Joi.string().required(),
    role: Joi.string().required(),
    gender: Joi.string().required(),
    countryCode: Joi.string().required(),
    phone: Joi.string().required(),
});

const staffFindSchema = Joi.object({
    search: Joi.string().optional(),
    searchType: Joi.string().optional(),
}).xor('search', 'searchType');


class StaffValidator {
    static postValidate(data) {
        return staffPostSchema.validate(data);
    }

    static findValidate(data) {
        return staffFindSchema.validate(data);
    }
}

export default StaffValidator;