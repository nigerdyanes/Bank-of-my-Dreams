import Transaction from '../../models/transaction';
import sequelize,{ Op } from "sequelize";
import { ITransaction } from "../../interfaces/Transaction";

export class TransactionsServices {

    async getTransactions(idAccount:number, idUser:number) {
        try {
            const transactions = await Transaction.findAll({where:{idAccount,idUser}});
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

    async createTransaction(transaction:ITransaction, idUser:number){
        const newTransaction = await Transaction.build({
            idAccount:transaction.idAccount,
            idUser,
            commerce:transaction.commerce,
            amount:transaction.amount,
            iva:transaction.iva,
            amountNeto:transaction.amountNeto,
            status:transaction.status,
        });

        newTransaction.save();
        return newTransaction;
    }

    async getAverageAmount(start:string,end:string, idUser:number){
        try {
            const startedDate = new Date(start);
             const endDate = new Date(end);
            const averageAmount = await Transaction.findAll({
                attributes: [
                     [sequelize.fn('AVG', sequelize.col('amountNeto')), 'avgAmount'],
                ],
                where:{"createdAt" : {[Op.between] : [startedDate , endDate ]},
                        "idUser":{[Op.and]:[idUser]}
                },
            
            });
            return averageAmount[0].get().avgAmount;
        } catch (error) {
            throw new Error("Cannot get average for this account");
        }
    }

}