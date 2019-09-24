import * as Joi from "joi";

export const createUser = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    password: Joi.string().required(),
});

export const updateUser = Joi.object().keys({
    name: Joi.string().optional(),
    password: Joi.string().required(),
    city: Joi.string().optional(),
});
