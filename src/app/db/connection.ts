import { Sequelize } from "sequelize";
import config from "../config/config";


export class Connection {
    public connection;
    constructor() {
        this.connection = new Sequelize(config.db.mysql.dbName,config.db.mysql.dbUser,config.db.mysql.dbPassword,{
            host:config.db.mysql.host,
            dialect:'mysql',
            logging: false
        });
    }

    async dbConnection(){
        try {
            await this.connection.authenticate();
            console.log('Database is online');
        } catch (error) {
            throw new Error('Problem when try connect with Database');
        }
    }

}
