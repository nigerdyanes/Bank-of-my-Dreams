import joi from "joi";

export const authSchema = joi.object({
    identification: joi.number().required(),
    password: joi.required(),
});


