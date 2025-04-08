import express from 'express';
import user from '../features/user';
import auth from '../features/auth';

export default (app: express.Application) => {
  app.use('/api/auth', auth.routes.authRoutes);
  app.use('/api/user', auth.middlewares.protectRoute, user.routes.userAdminRoutes);
};
