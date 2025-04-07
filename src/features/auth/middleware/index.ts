import { checkRoleAccess, protectRoute } from './auth.middleware';

export default {
  protectRoute,
  checkRoleAccess,
};
