import { Request, Response, NextFunction } from "express";
import { createTransactionSchema, getAverageAmountSchema } from "../utils/schemas/transaction";
import { AccountServices } from '../api/accounts/services';
import Boom from "@hapi/boom";

export const validationCreateTransaction = (req:Request, res: Response, next:NextFunction) => {
    createTransactionSchema.validateAsync(req.body)
        .then(() => next())
        .catch((error) => {
            res.status(400).send(Boom.badRequest(error));
        });
}

export const validationQueryAvergeAmount = (req: Request, res: Response, next:NextFunction) => {
    getAverageAmountSchema.validateAsync(req.query)
        .then(() => next())
        .catch((error)=>{
            res.status(400).send(Boom.badRequest(error));
        });
}

export const checkExistAccount = async(req: Request, res: Response, next:NextFunction) => {
    
    const accountServices = new AccountServices();
    //@ts-ignore
    const existAccount = await accountServices.checkExistAccount(req.body.idAccount);
    if (existAccount) {
        next();
    }else{
        res.status(400).send(Boom.badRequest('This idAccount does not exist.'));
    }

}