import Joi from "joi";

const productSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'title is not allowed to be empty',
        'any.required': 'title is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'description is not allowed to be empty',
        'any.required': 'description is required'
    }),
    propertytype: Joi.string().required().messages({
        'string.empty': 'propertytype is not allowed to be empty',
        'any.required': 'propertytype is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required'
    }),
    location: Joi.string().required().messages({
        'string.empty': 'location is not allowed to be empty',
        'any.required': 'location is required'
    }),
    photo: Joi.string().required().messages({
        'string.empty': 'photo is not allowed to be empty',
        'any.required': 'photo is required'
    }),
})

export default productSchema;