import joi from "joi";
import { validProducts } from "../emuns/product";
export const createProductSchema = joi.object({
    name: joi.valid(validProducts.CreditCard,validProducts.SavingsAccount,validProducts.AgileCredit,validProducts.HomeLeasing).required(),
});