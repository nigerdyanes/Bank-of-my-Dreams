import { Request, Response } from "express";
import { TransactionsServices } from './services';
import Boom  from "@hapi/boom";

const transactionsServices = new TransactionsServices;


export const getTransactions = async(req: Request, res: Response) => {
    try {
        // @ts-ignore
        const transactions = await transactionsServices.getTransactions(req.params.idAccount, req.user.id);
        res.status(200).json({
            status: "success",
            data:transactions
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(Boom.internal());
    }
}

export const getDetailsTransaction = async(req: Request, res: Response) => {
    try {
        const { transactionId } =req.params;
        const transactionFound = await transactionsServices.getTransaction(Number(transactionId));
        res.status(200).json({
            status: "success",
            data:transactionFound,
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(Boom.internal());
    }
}

export const createTransaction = async(req: Request, res: Response) => {
    //@ts-ignore
    const newTransaction = await transactionsServices.createTransaction(req.body,req.user.id);
    res.status(201).json({
        status: "success",
        data: newTransaction
    });
}   

export const getAverageAmount = async(req: Request, res: Response) => {
    try {
        const{ start, end } =req.query;
         // @ts-ignore
        const averageAmount = await transactionsServices.getAverageAmount(start ,end, req.user.id); 
        if (averageAmount) {
            res.status(200).json({
                status: "success",
                data:averageAmount
            });
        }else{
            res.status(200).json({
                status: "success",
                message:"There are no transactions for this time period"
            });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(Boom.internal());
    }
    
}