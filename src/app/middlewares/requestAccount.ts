import { Request, Response, NextFunction } from "express";
import { createAccountSchema, updateAccountSchema } from "../utils/schemas/account";
import { AccountServices } from '../api/accounts/services';
import Boom from "@hapi/boom";


export const validationCreateAccount = (req: Request, res:Response, next:NextFunction) => {
    createAccountSchema.validateAsync(req.body)
        .then(() => next())
        .catch((error) => {
            res.status(400).send(Boom.badRequest(error));
        });
}

export const validationupdateStatusAccount = (req: Request, res:Response, next:NextFunction) => {
    const accountServices = new AccountServices();
    updateAccountSchema.validateAsync(req.body)
    .then(async() => {
        //@ts-ignore
        const existAccount = await accountServices.checkExistAccount(req.params.idAccount);
        if (existAccount) {
            next();
        }else{
            res.status(400).send(Boom.badRequest('This idAccount does not exist.'));
        }
    })
    .catch((error) => {
        res.status(400).send(Boom.badRequest(error));
    });

}