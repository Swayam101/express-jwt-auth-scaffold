import { Router } from 'express';
import { login, register } from '../controllers';
import { loginSchema, registerSchema } from '../validations';
import { validate } from '../../../middleware/validate.middleware';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;