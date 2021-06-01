import joi from "joi";
import { validAccounts } from "../emuns/accounts";

export const createAccountSchema = joi.object({
    account: joi.string().valid(validAccounts.CurrentAccount,validAccounts.SavingsAccount).required(),
});

export const updateAccountSchema = joi.object({
    status: joi.boolean().required(),
});