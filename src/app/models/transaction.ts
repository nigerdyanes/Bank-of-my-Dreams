import { DataTypes } from "sequelize";
import { Connection } from '../db/connection';
const db = new Connection();

const Transaction = db.connection.define('Transaction', {
    idAccount:{
        type: DataTypes.NUMBER
    },
    commerce :{
        type: DataTypes.STRING
    },
    amount:{
        type: DataTypes.FLOAT
    },
    iva:{
        type: DataTypes.FLOAT
    },
    amountNeto:{
        type: DataTypes.FLOAT
    },
    status:{
        type: DataTypes.STRING
    }
});


export default Transaction;