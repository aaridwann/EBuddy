/* eslint-disable no-unused-vars */
import { Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import _ from 'lodash';

import { generateResponse } from '../utils';

import { AuthenticatedRequest } from './authMiddleware.types';

/**
 * Auth middleware
 * @param {Request} req - Request method from express
 * @param {Request} res - Response method from express 
 * @param {NextFunction} next - Next method from express
 * @returns {Promise<void>} - Auth middleware
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = _.get(req.headers, 'authorization', '').split('Bearer ')[1];

    if (!token && !process.env.BYPASS_AUTH) {
      res.status(401).json(generateResponse(false, { code: 'UNAUTHORIZED', message: 'Unauthorized' }));

      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    next();
  } catch (_error) {
    res.status(401).json(generateResponse(false, { code: 'INVALID_TOKEN', message: 'Invalid token' }));
  }
};
