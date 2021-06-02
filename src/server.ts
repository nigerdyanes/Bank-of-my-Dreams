import express from 'express';
import swaggerUi from "swagger-ui-express";

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
//SwaggerDoc
//@ts-ignore
import swaggerDoc from "../openapi.json";

const app = express();
const connection = new Connection();

//Autenticate DB
connection.dbConnection();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routers
app.use('/api/', authRoutes); // Auth Routes
app.use('/api/accounts', loggerMiddleware, accountRoutes) // Accounts Routes
app.use('/api/transactions', loggerMiddleware, transactionsRoutes) // Transactions Routes
app.use('/api/products', loggerMiddleware, productsRoutes) // Products Routes

//API-DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Starting server.
app.listen(config.port, () => {
    return console.log(`Server is listening on ${config.port}`);
});