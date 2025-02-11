import { Request } from 'express';
import admin from 'firebase-admin';

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
};