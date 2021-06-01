import Product from "../../models/product";
import { IProduct } from "../../interfaces/Product";

export class ProductServices {
    async getProducts(){
        try {
            const products = await Product.findAll();
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

