import { DataTypes } from "sequelize";
import { Connection } from '../db/connection';
const db = new Connection();

const Account = db.connection.define('Account', {
    idUser:{
        type: DataTypes.NUMBER
    },
    account :{
        type: DataTypes.STRING
    },
    active:{
        type: DataTypes.BOOLEAN
    }
});


export default Account;