import { Request, Response } from 'express';
import { AuthService } from '../services';
import { logger } from '../../../utils/logger';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const userExists = await AuthService.findUserByEmail(email);
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await AuthService.createUser({ email, password, name });
    const token = AuthService.generateToken(user._id.toString());

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    logger.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
