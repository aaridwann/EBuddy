import { Request, Response } from 'express';
import { get } from 'lodash';

import { createUser, getUserById, updateUser } from '../repository/userCollection';
import { generateResponse } from '../utils';

import { userSchema } from './validations';

/**
 * Throw unauthorize response handler
 * @param {Response} res - Response function from express
 * @returns {void} - Throw unauthorize response handler
 */
export const throwUnAuthorized = (res: Response): Response => 
  res.status(401).json(generateResponse(false, { code: 'UNAUTHORIZED', message:'Unauthorized' }));

/**
 * Fetch user data controller
 * @param {Request} req - Request function from express
 * @param {Response} res - Response function from express
 * @returns {Promise<Response>} - Fetch user data controller 
 */
export const fetchUserData = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = get(req, 'user.uid');
    
    if (!userId) {
      return throwUnAuthorized(res);
    }

    const user = await getUserById(userId);
    
    return user
      ? res.status(200).json(user)
      : res.status(404).json(generateResponse(false, { code: 'USER_NOT_FOUND', message: 'User not found' }));
  } catch (_error) {
    return res.status(500).json(generateResponse(false, { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' }));
  }
};

/**
 * Update user data controller
 * @param {Request} req - Request function from express
 * @param {Response} res - Response function from express
 * @returns {Promise<Response>} - Update user data controller
 */
export const updateUserData = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = get(req, 'user.uid');
    
    if (!userId) {
      return throwUnAuthorized(res);
    }

    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json(generateResponse(false, { 
        code: 'VALIDATION_ERROR', 
        message: `'Validation Error ${error.details.map((err) => err.message)}`,
      }));
    }

    const user = await updateUser(userId, value);

    return res.status(201).json(user);
  } catch (_error) {
    return res.status(500).json(generateResponse(false, { code: 'FAILED_UPDATE_USER', message: 'Failed update user' }));
  }
};

/**
 * Create user data
 * @param {Request} req - Request method
 * @param {Response} res - Response method
 * @returns {Promise<Response>} - Create user data
 */
export const createUserData = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = get(req, 'user.uid');

    if (!userId) {
      return throwUnAuthorized(res);
    }

    const user = await createUser({ uid: userId, ...req.body });

    return res.status(201).json(user);
  } catch (_error) {
    return res.status(500).json(generateResponse(false, { code: 'FAILED_CREATE_USER', message: 'Failed to create user' }));
  }
};
