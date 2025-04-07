import { asyncWrapper } from '../../../utils/asyncWrapper.utils';
import { login } from './login.controller';
import { register } from './register.controller';

export default {
  login: asyncWrapper(login),
  register: asyncWrapper(register),
};
