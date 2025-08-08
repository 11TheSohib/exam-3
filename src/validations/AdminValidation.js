import Joi from 'joi';

class UserValidator {
    static passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    static phoneRegex =
        /^(\+?[1-9]\d{0,3})?[-.\s]?(\(?[1-9]\d{0,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{0,9}$/;

    create() {
        return Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(UserValidator.passwordRegex)
                .required(),
            phoneNumber: Joi.string()
                .pattern(UserValidator.phoneRegex)
                .required(),
        });
    }

    signin() {
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
    }

    update() {
        return Joi.object({
            username: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phoneNumber: Joi.string()
                .pattern(UserValidator.phoneRegex)
                .optional(),
            password: Joi.string()
                .pattern(UserValidator.passwordRegex)
                .optional(),
        });
    }

    password() {
        return Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string()
                .pattern(UserValidator.passwordRegex)
                .required(),
        });
    }

    forgetPassword() {
        return Joi.object({
            email: Joi.string().email().required(),
        });
    }

    confirmOTP() {
        return Joi.object({
            email: Joi.string().email().required(),
            otp: Joi.string().length(6).required(),
        });
    }

    confirmPassword() {
        return Joi.object({
            email: Joi.string().email().required(),
            newPassword: Joi.string()
                .pattern(UserValidator.passwordRegex)
                .required(),
        });
    }
}

export default new UserValidator();
