import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

import { generateResponse } from '../utils';

import { authMiddleware } from './authMiddleware';

jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn(),
  }),
}));

describe('authMiddleware', () => {
  let req;
  let res;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 when token is missing and BYPASS_AUTH is not set', async () => {
    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      generateResponse(false, { code: 'UNAUTHORIZED', message: 'Unauthorized' }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() when token is valid', async () => {
    process.env.BYPASS_AUTH = '';
    req.headers = { authorization: 'Bearer validToken' };

    (admin.auth().verifyIdToken as jest.Mock).mockResolvedValue({
      uid: '123',
      email: 'user@test.com',
    });

    await authMiddleware(req as Request, res as Response, next);

    expect(admin.auth().verifyIdToken).toHaveBeenCalledWith('validToken');
    expect(req.user).toEqual({ uid: '123', email: 'user@test.com' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 when token is invalid', async () => {
    process.env.BYPASS_AUTH = '';
    req.headers = { authorization: 'Bearer invalidToken' };

    (admin.auth().verifyIdToken as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      generateResponse(false, { code: 'INVALID_TOKEN', message: 'Invalid token' }),
    );
    expect(next).not.toHaveBeenCalled();
  });
});
