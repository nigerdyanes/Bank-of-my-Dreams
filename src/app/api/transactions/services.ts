import Transaction from '../../models/transaction';
import sequelize,{ Op } from "sequelize";
import { ITransaction } from "../../interfaces/Transaction";

export class TransactionsServices {

    async getTransactions() {
        try {
            const transactions = await Transaction.findAll();
            return transactions;
        } catch (error) {
            throw new Error("Cannot get Transactions");
        }
    }

    async getTransaction(transactionId:number){
        try {
            const transactionFound = await Transaction.findOne( { where: { id:transactionId } } );
            return transactionFound;
        } catch (error) {
            throw new Error("Cannot get Transaction");
        }
    }   

    async createTransaction(transaction:ITransaction){
        const newTransaction = await Transaction.build({
            idAccount:transaction.idAccount,
            commerce:transaction.commerce,
            amount:transaction.amount,
            iva:transaction.iva,
            amountNeto:transaction.amountNeto,
            status:transaction.status,
        });

        newTransaction.save();
        return newTransaction;
    }

    async getAverageAmount(start:string,end:string){
        try {
            const startedDate = new Date(start);
             const endDate = new Date(end);
            const averageAmount = await Transaction.findAll({
                attributes: [
                     [sequelize.fn('AVG', sequelize.col('amountNeto')), 'avgAmount'],
                ],
                where:{"createdAt" : {[Op.between] : [startedDate , endDate ]}}
            });
            return averageAmount[0].get().avgAmount;
        } catch (error) {
            throw new Error("Cannot get average for this account");
        }
    }

}