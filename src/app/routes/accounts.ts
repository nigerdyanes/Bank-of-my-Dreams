import { Router } from "express";
import { getAccounts,createAccount,updateStatusAccount } from '../api/accounts/controller';
import { validationCreateAccount,validationupdateStatusAccount  } from "../middlewares/requestAccount";

const router = Router();

router.get('/', getAccounts);
router.post('/', validationCreateAccount, createAccount);
router.put('/:idAccount', validationupdateStatusAccount, updateStatusAccount);


export default router;