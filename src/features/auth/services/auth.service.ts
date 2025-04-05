import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../user/models';
import { logger } from '../../../utils/logger';

export class AuthService {
  static generateToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN!),
    });
  }

  static async findUserByEmail(email: string) {
    return User.findOne({ email });
  }

  static async createUser(userData: { email: string; password: string; name: string }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    return User.create({
      ...userData,
      password: hashedPassword,
    });
  }

  static async validateUser(email: string, password: string) {
    try {
      const user = await this.findUserByEmail(email);
      
      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return null;
      }

      return user;
    } catch (error) {
      logger.error('Auth Service Error:', error);
      throw error;
    }
  }
} 