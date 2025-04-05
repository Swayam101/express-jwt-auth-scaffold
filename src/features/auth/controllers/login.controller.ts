import { Request, Response } from 'express';
import { AuthService } from '../services';
import { logger } from '../../../utils/logger';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.validateUser(email, password);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = AuthService.generateToken(user._id.toString());

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    logger.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
