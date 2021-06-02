import { Request, Response } from "express";
import { ProductServices } from './services';
import Boom from "@hapi/boom";

const productServices = new ProductServices();

export const getProducts = async(req: Request, res: Response) => {
    try {
        // @ts-ignore
        const products = await productServices.getProducts(req.user.id);
        res.status(200).json({
            status: "success",
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(Boom.internal());
    }
}

export const createProduct = async(req:Request, res: Response) => {
    // @ts-ignore   
    const newProduct = await productServices.createProduct(req.body,req.user.id);
    res.status(201).json({
        status: "success",
        data:newProduct
    });
}

