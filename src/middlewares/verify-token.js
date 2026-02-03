import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const verifyToken = (req, res, next) => {
  const authorization =
    req.headers.authorization || req.headers.Authorization;

  if (!authorization?.startsWith('Bearer '))
    return res.sendStatus(401);

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
