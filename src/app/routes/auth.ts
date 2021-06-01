import { Router } from 'express';
import { login, register } from '../api/auth/controller';
import { validationAuth,existsIdentification } from "../middlewares/requestAuth";
const router = Router();


router.get('/login', validationAuth, login);
router.post('/register',[validationAuth,existsIdentification], register);


export default router;


