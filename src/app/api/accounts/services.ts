import Account from "../../models/account";

export class AccountServices {
    async getAccounts(idUser:number) {
        try {
            const accounts = await Account.findAll({where:{idUser}});
            return accounts;
        } catch (error) {
            throw new Error("Cannot get Accounts");
        }
    }

    async createAccount(account:string, idUser:number){
        const newAccount = await Account.build({
            idUser,
            account,
        });
        newAccount.save();
        return newAccount;
    }

    async updateStatusAccount(status:boolean, id:number){
        const accountUpdated = await Account.update({active:status},{where:{id}});
        return accountUpdated;
    }

    async checkExistAccount(idAccount:number){
        const existAccount = await Account.findOne({where:{id:idAccount}});
        return existAccount;
    }
}