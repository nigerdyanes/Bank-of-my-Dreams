import { Router } from "express";
import { getTransactions,getDetailsTransaction,createTransaction, getAverageAmount } from "../api/transactions/controller";
import { validationCreateTransaction,validationQueryAvergeAmount,checkExistAccount } from "../middlewares/requestTransaction";
const router = Router();

router.get('/averageAmount', validationQueryAvergeAmount, getAverageAmount);
router.get('/:idAccount', getTransactions);
router.get('/:transactionId/details', getDetailsTransaction);
router.post('/', [validationCreateTransaction,checkExistAccount], createTransaction);

export default router;