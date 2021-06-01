import dotenv from 'dotenv';
dotenv.config();
const config = {
        port : process.env.PORT || 3000,
        db:{
                mysql:{
                        host:process.env.DB_HOST || 'localhost',
                        dbName:process.env.DB_NAME || 'db',
                        dbUser:process.env.DB_USER || 'root',
                        dbPassword:process.env.DB_PASSWORD || '',
                }
        },
        jwt:{
                secret:process.env.SECRET || 'secret',
        },
        expirationTimeToken: process.env.EXPIRATION_TIME_TOKEN || 1800,
}

export default config;