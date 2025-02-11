import express from 'express';

import { createUserData, fetchUserData, updateUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';
import Constants from '../constans';

const {
  PATH_NAME: { FETCH_USER, UPDATE_USER, CREATE_USER },
} = Constants;

const router = express.Router();

const asyncHandler = (fn) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise.resolve(fn(req, res, next)).catch(next);

router.get(FETCH_USER, authMiddleware, asyncHandler(fetchUserData));
router.put(UPDATE_USER, authMiddleware, asyncHandler(updateUserData));
router.post(CREATE_USER, authMiddleware, asyncHandler(createUserData));

export default router;
