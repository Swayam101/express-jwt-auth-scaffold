import { Router } from 'express';
import controller from '../controllers';
import validations from '../validations';
import { validate } from '../../../middleware/validate.middleware';

const router = Router();

router.post('/register', validate(validations.registerSchema), controller.register);

router.post('/login', validate(validations.loginSchema), controller.login);

export default router;
