import { Request, Response } from 'express';
import { IUser } from '../../interfaces/User';
import { UserServices } from './services';
import Boom from "@hapi/boom";
import Jwt from '../../lib/jwt';
import bcrypt from "bcryptjs";


const userService = new UserServices();
const jwtClass = new Jwt();


export const login = async (req : Request, res : Response) => {
    try {
        const userFound = await userService.checkLogin(req.body);
            // @ts-ignore
        const validateSession = await bcrypt.compare(req.body.password, userFound.password);
            if (validateSession) {
                const token = jwtClass.singContract(userFound)
                res.status(200).json({
                    status: "success",
                    token,
                });
            }else{
                res.status(403).send(Boom.forbidden('Please validate the data sent'));
            }
    } catch (error) {
        res.status(400).send(Boom.badRequest('User not found, check this yourself'));
    }
    
}


export const register = async(req : Request, res : Response) => {
    
    const { identification, password } = req.body;
    const passwordEncrypted = await bcrypt.hash(password,5);
    
    const user : IUser = {
        identification,
        password:passwordEncrypted
    }

    const newUser = await userService.createUser(user);
    res.status(201).json({
        status: "success",
        data:{
            //@ts-ignore
            identification:newUser.identification,
            //@ts-ignore
            createdAt:newUser.createdAt,
        }
    });
}
