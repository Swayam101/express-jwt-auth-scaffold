import { asyncWrapper } from '../../../utils/asyncWrapper.utils';
import getAllUsersController from './getAllUsers.controller';
import getUserByIdController from './getUserById.controller';

export default {
  getAllUsers: asyncWrapper(getAllUsersController),
  getUserById: asyncWrapper(getUserByIdController),
};
