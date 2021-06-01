import { DataTypes } from "sequelize";
import { Connection } from '../db/connection';
const db = new Connection();

const User = db.connection.define('User', {
    identification:{
        type: DataTypes.NUMBER
    },
    password :{
        type: DataTypes.STRING
    }

});


export default User;
