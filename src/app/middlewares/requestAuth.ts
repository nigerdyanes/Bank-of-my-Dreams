import { Request, Response, NextFunction } from "express";
import { authSchema } from "../utils/schemas/auth";
import { UserServices } from '../api/auth/services';
import Boom from "@hapi/boom";


export const validationAuth = async(req:Request, res:Response, next: NextFunction) => {
    authSchema.validateAsync(req.body)
        .then(() => next())
        .catch((error) => {
            res.status(400).send(Boom.badRequest(error));
        });
}

export const existsIdentification = async(req:Request, res:Response, next: NextFunction) => {
    try {
        const userServices = new UserServices();
        const checkIdentification = await userServices.checkIfExistIdentification(req.body.identification);
        if (checkIdentification) {
            res.status(400).send(Boom.badRequest('Identification already exists'));
            return false;
        }else{
            next();
        }
    } catch (error) {
        console.error(error);
    }
}