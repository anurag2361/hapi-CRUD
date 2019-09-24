import * as Joi from "joi";

export const createUser = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
});

export const updateUser = Joi.object().keys({
    name: Joi.string().optional(),
    city: Joi.string().optional(),
});
