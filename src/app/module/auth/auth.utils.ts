import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userEmail: string; role: string; name: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};