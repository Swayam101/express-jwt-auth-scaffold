import { Router } from 'express';
import controller from '../controllers';
import validations from '../validations';
import { validate } from '../../../middleware/validate.middleware';
import middleware from '../middleware';

const router = Router();

router.post('/register', validate(validations.registerSchema), controller.register);

router.post('/login', validate(validations.loginSchema), controller.login);

router.get("/profile", middleware.protectRoute, controller.userProfile)

export default router;
