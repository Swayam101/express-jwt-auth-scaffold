import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.JWT_SECRET!;
// console.log("jwt secret : ", process.env);

const generateJwtToken = (userId: string) => {
  return jwt.sign({ _id: userId }, SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN! as any,
  });
};

const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

export default {
  generateJwtToken,
  verifyJwtToken,
};
