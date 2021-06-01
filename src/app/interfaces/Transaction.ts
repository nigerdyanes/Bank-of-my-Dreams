import { validStatusTransaction } from "../utils/emuns/transaction";
export interface ITransaction {
    idAccount:number,
    commerce:string,
    amount:bigint,
    iva:bigint,
    amountNeto:bigint,
    status:validStatusTransaction
}