import { asyncWrapper } from '../../../utils/asyncWrapper.utils';
import getUserProfileController from './getUserProfile.controller';
import { login } from './login.controller';
import { register } from './register.controller';

export default {
  login: asyncWrapper(login),
  register: asyncWrapper(register),
  userProfile: asyncWrapper(getUserProfileController),
};
