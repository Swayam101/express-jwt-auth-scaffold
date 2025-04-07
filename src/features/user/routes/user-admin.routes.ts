import { Router } from 'express';
import controller from '../controllers';
import auth from '../../auth';
import ERoles from '../../auth/types/role.enum';

const { middlewares } = auth;

const router = Router();

router.post('/users', middlewares.checkRoleAccess(ERoles.ADMIN), controller.getAllUsers);
router.post('/user/:id', middlewares.checkRoleAccess(ERoles.ADMIN), controller.getUserById);

export default router;
