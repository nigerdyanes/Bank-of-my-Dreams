import { Request, Response } from "express";
import { AccountServices } from './services';
import Boom from "@hapi/boom";

const accountServices = new AccountServices();

export const getAccounts = async(req: Request, res: Response)=>{
    try {        
        const accounts = await accountServices.getAccounts();
        res.status(200).json({
            status: "success",
            data: accounts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(Boom.internal());
    }
}


export const createAccount = async(req: Request, res: Response) => {
    // @ts-ignore
    const {account} = await accountServices.createAccount(req.body.account,req.user.id);
    res.status(201).json({
        status: "success",
        data:account,
    });
}


export const updateStatusAccount = async(req: Request, res: Response) => {
    await accountServices.updateStatusAccount(req.body.status, Number(req.params.idAccount))
    res.status(200).json({
        status: "success",
        message:"Account is updated",
    });
}