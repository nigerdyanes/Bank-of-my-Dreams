import express from 'express';
// Routes
import authRoutes from '../routes/auth';
import accountRoutes from "../routes/accounts";
import transactionsRoutes from "../routes/transactions";
import productsRoutes from "../routes/products";
//DB
import { Connection } from '../db/connection';
//Middleware
import { loggerMiddleware } from "../middlewares/isAuth";

const app = express();
const connection = new Connection();

//Autenticate DB
connection.dbConnection()
    .then()
    .catch(err =>{
        throw new Error(err);
    });

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routers
app.use('/api/', authRoutes); // Auth Routes
app.use('/api/accounts', loggerMiddleware,accountRoutes) // Accounts Routes
app.use('/api/transactions', loggerMiddleware,transactionsRoutes) // Transactions Routes
app.use('/api/products', loggerMiddleware,productsRoutes) // Products Routes


export default app;

