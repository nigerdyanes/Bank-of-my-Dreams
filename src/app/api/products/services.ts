import Product from "../../models/product";
import { IProduct } from "../../interfaces/Product";

export class ProductServices {
    async getProducts(idUser:number){
        try {
            const products = await Product.findAll({where: {idUser}});
            return products;
        } catch (error) {
            throw new Error("Cannot get Products");
        }
    }

    async createProduct(product:IProduct, idUser:number){
        const newProduct = await Product.build({
            idUser,
            product:product.name,
        });
        newProduct.save();
        return newProduct;
    }
}

