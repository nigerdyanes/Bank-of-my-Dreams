import joi from "joi";
import { validStatusTransaction } from "../emuns/transaction";

export const createTransactionSchema = joi.object({
    idAccount: joi.required(),
    commerce: joi.string().required(),
    amount:joi.required(),
    iva:joi.required(),
    amountNeto:joi.required(),
    status:joi.valid(validStatusTransaction.PaidOut,validStatusTransaction.Reject).required(),
});

export const getAverageAmountSchema = joi.object({
    start:joi.required(),
    end:joi.required(),
});