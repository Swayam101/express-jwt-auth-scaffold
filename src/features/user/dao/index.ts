import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

import models from '../models';
import { IUser } from '../models/user.model';
import paginate from '../../../utils/paginate.util';
import { FilterQuery } from 'mongoose';
import { IPaging } from '../../../interfaces';

export default {
  getAllUsers: (filter: FilterQuery<IUser>, { page, limit }: IPaging) => {
    return paginate(models.User, filter, page, limit);
  },
  getUserById: (id: ObjectId) => {
    return models.User.findById(id);
  },
  getUserByEmail: (email: string) => {
    return models.User.findOne({ email });
  },
  createUser: (user: Pick<IUser, 'email' | 'password' | 'name' | 'role'>) => {
    return models.User.create(user);
  },
  verifyUserCredentials: async ({ email, password }: Pick<IUser, 'email' | 'password'>) => {
    const user = await models.User.findOne({ email });
    if (!user) {
      return null;
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return null;
    }

    return user;
  },
};
