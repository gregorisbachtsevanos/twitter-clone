const Joi = require("joi");

const userSchema = Joi.object({
    firstname: Joi.string().required(),
    surname: Joi.string().required(),
    username: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    year_of_birth: Joi.date().min('1950').max('2013').required(),
    month_of_birth: Joi.date().min('01').max('12').required(),
    day_of_birth: Joi.date().min('01').max('31').required(),
    password: Joi.string().min(8).max(20).required(),
    repeat_password: Joi.string().min(8).max(20).required()
});

const postSchema = Joi.object({
    post: Joi.string().required(),
    repost: Joi.any(),
})

module.exports = { userSchema, postSchema }