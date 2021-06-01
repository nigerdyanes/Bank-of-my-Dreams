import {Request} from 'express';
import config from "../../config/config";
import jwt from "jsonwebtoken";


class Jwt {
    singContract(user:any){
        user = JSON.parse(JSON.stringify(user));
        return jwt.sign(user,config.jwt.secret, { expiresIn: config.expirationTimeToken });
    }


    verifyToken(req:Request){
        const token = this.parserToken(req);

        try {
            return jwt.verify(token, config.jwt.secret)
        } catch (error) {
            throw new Error("Invalid token");
        }

    }

    private parserToken(req:Request){
        const authorization = req.headers.authorization;
        
        if(!authorization){
            throw new Error("No auth token sent");
        }

        if (authorization.indexOf("Bearer ") === -1) {
            throw new Error("Invalid token format");
        } 
        
        return authorization.replace("Bearer", "").trim();
    }


}

export default Jwt;