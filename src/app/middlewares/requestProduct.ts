import { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../utils/schemas/product";
import Boom from "@hapi/boom";

export const validationCreateProduct = (req:Request, res:Response, next:NextFunction) => {
    createProductSchema.validateAsync(req.body)
        .then(() => next())
        .catch((error) => {
            res.status(400).send(Boom.badRequest(error));
        });
}