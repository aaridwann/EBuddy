import { Request, Response } from 'express';

import { fetchUserData, updateUserData } from '../controller/api';
import { getUserById, updateUser } from '../repository/userCollection';
import { userSchema } from '../controller/validations';

jest.mock('../repository/userCollection.ts', () => ({
  getUserById: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock('../utils', () => ({
  generateResponse: jest.fn((success, payload) => ({ success, ...payload })),
}));

jest.mock('../controller/validations.ts', () => ({
  userSchema: {
    validate: jest.fn(),
  },
}));

describe('User Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { user: { uid: 'abc123' }, body: {} };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('fetchUserData', () => {
    it('should return user data if user exists', async () => {
      (getUserById as jest.Mock).mockResolvedValue({ id: 'abc123', email: 'user@example.com' });

      await fetchUserData(req as Request, res as Response);

      expect(getUserById).toHaveBeenCalledWith('abc123');
      expect(res.json).toHaveBeenCalledWith({ id: 'abc123', email: 'user@example.com' });
    });

    it('should return 404 if user not found', async () => {
      (getUserById as jest.Mock).mockResolvedValue(null);

      await fetchUserData(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      req.user = undefined;

      await fetchUserData(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    });

    it('should return 500 on error', async () => {
      (getUserById as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await fetchUserData(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
    });
  });

  describe('updateUserData', () => {
    it('should return updated user data on success', async () => {
      (userSchema.validate as jest.Mock).mockReturnValue({ error: null, value: { email: 'new@example.com' } });
      (updateUser as jest.Mock).mockResolvedValue({ id: 'abc123', email: 'new@example.com' });

      await updateUserData(req as Request, res as Response);

      expect(updateUser).toHaveBeenCalledWith('abc123', { email: 'new@example.com' });
      expect(res.json).toHaveBeenCalledWith({ id: 'abc123', email: 'new@example.com' });
    });

    it('should return 400 if validation fails', async () => {
      (userSchema.validate as jest.Mock).mockReturnValue({ 
        error: { details: [{ message: 'Email is required' }] }, 
      });

      await updateUserData(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'VALIDATION_ERROR',
        message: "'Validation Error Email is required",
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      req.user = undefined;

      await updateUserData(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    });

    it('should return 500 if update fails', async () => {
      (userSchema.validate as jest.Mock).mockReturnValue({ error: null, value: { email: 'new@example.com' } });
      (updateUser as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await updateUserData(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'FAILED_UPDATE_USER',
        message: 'Failed update user',
      });
    });
  });
});
