import { Router } from 'express';
import controller from '../controllers';
import auth from '../../auth';
import ERoles from '../../auth/types/role.enum';

const { middlewares } = auth;

const router = Router();

router.get('/users', middlewares.checkRoleAccess(ERoles.ADMIN), controller.getAllUsers);
router.get('/user/:id', middlewares.checkRoleAccess(ERoles.ADMIN), controller.getUserById);

export default router;
