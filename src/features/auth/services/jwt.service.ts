import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

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
