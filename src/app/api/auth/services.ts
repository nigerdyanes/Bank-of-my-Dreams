import User from '../../models/user';
import { IUser } from '../../interfaces/User';


export class UserServices {

    async checkLogin(user:IUser){
        try {
            const userFound = await User.findOne( { where: { identification:user.identification } } );
            return userFound;
        } catch (error) {
            throw new Error("User not found");
        }
    }

    async createUser(user:IUser){
        const newUser =User.build({
            identification:user.identification,
            password:user.password
        });
        return newUser.save();
    }

    async checkIfExistIdentification(identification:number){
        try {
            const identificationFound = await User.findOne({where: { identification}  });
            return identificationFound;
        } catch (error) {
            console.error(error);
            throw new Error("Canot found identification");
        }
    }
}
