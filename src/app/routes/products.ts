import { Router } from "express";
import { getProducts, createProduct } from "../api/products/controller";
import { validationCreateProduct } from "../middlewares/requestProduct";

const router = Router();

router.get('/', getProducts);
router.post('/', validationCreateProduct, createProduct);


export default router;

