import jwt from 'jsonwebtoken';

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
};

export default generateToken;
