import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'username is not allowed to be empty',
        'any.required': 'username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'email is not allowed to be empty',
        'string.email': 'email must be a valid email address',
        'any.required': 'email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'password is not allowed to be empty',
        'any.required': 'password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': 'confirm password is not allowed to be empty',
        'any.required': 'confirm password is required',
        'any.only': 'confirm password must match password'
    }),
})

export default userSchema;