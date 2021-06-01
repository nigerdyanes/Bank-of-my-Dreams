import { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";
import Jwt from "../lib/jwt";
const jwtClass = new Jwt();


export const loggerMiddleware = (req: Request, res:Response, next:NextFunction ) => {
     try {
        const isLogged = jwtClass.verifyToken(req);
        // @ts-ignore
        req.user = isLogged; // Set data of user in session
        next();
     } catch (error) {
        res.status(401).send(
           Boom.unauthorized(error)
        )
     }  
};