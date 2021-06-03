import { DataTypes } from "sequelize";
import { Connection } from '../db/connection';

const db = new Connection();

const Product = db.connection.define('product', {
    idUser:{
        type: DataTypes.NUMBER
    },
    product:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    }
});

export default Product;