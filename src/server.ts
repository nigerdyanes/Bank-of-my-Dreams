import express from 'express';
//Config
import config from './app/config/config'
// Routes
import authRoutes from './app/routes/auth';
import accountRoutes from "./app/routes/accounts";
import transactionsRoutes from "./app/routes/transactions";
import productsRoutes from "./app/routes/products";
//DB
import { Connection } from './app/db/connection';
//Middleware
import { loggerMiddleware } from "./app/middlewares/isAuth";

const app = express();
const connection = new Connection();

//Autenticate DB
connection.dbConnection();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routers
app.use('/', authRoutes); // Auth Routes
app.use('/accounts', loggerMiddleware, accountRoutes) // Accounts Routes
app.use('/transactions', loggerMiddleware, transactionsRoutes) // Transactions Routes
app.use('/products', loggerMiddleware, productsRoutes) // Products Routes

//Starting server.
app.listen(config.port, () => {
    return console.log(`Server is listening on ${config.port}`);
});