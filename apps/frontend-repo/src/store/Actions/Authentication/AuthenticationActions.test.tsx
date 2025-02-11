/* eslint-disable max-lines-per-function */
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import { createUserData } from '@/apis/userApi';

import { auth } from '../../../../../../packages/shared/src/firebase/firebaseConfigs';

import { loginUser, loginUserWithGoogle, logoutUser } from './AuthenticationActions';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}))
  .mock('@/apis/userApi', () => ({
    createUserData: jest.fn(),
  }))
  .mock('../../../../../../packages/shared/src/firebase/firebaseConfigs', () => ({
    auth: {},
  }));

describe('Auth Thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const userCredential = {
        user: { uid: '12345', email: 'test@example.com', getIdToken: jest.fn().mockResolvedValue('mockToken') },
      };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(userCredential);

      const dispatch = jest.fn();
      const thunk = loginUser({ email: 'test@example.com', password: 'password123' });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual({ uid: '12345', email: 'test@example.com', token: 'mockToken' });
    });

    it('should return error on login failure', async () => {
      const error = new Error('Login failed');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      const dispatch = jest.fn();
      const thunk = loginUser({ email: 'test@example.com', password: 'password123' });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual('Login failed');
      expect(result.meta.rejectedWithValue).toBe(true);
    });
  });

  describe('loginUserWithGoogle', () => {
    it('should login with Google and create user if new', async () => {
      const userCredential = {
        user: {
          uid: '12345',
          email: 'test@example.com',
          displayName: 'Test User',
          photoURL: 'test-photo-url',
          getIdToken: jest.fn().mockResolvedValue('mockToken'),
        },
        _tokenResponse: { isNewUser: true },
      };
      (signInWithPopup as jest.Mock).mockResolvedValue(userCredential);
      (createUserData as jest.Mock).mockResolvedValue({});

      const dispatch = jest.fn();
      const thunk = loginUserWithGoogle();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(createUserData).toHaveBeenCalledWith('mockToken', {
        uid: '12345',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'test-photo-url',
      });
      expect(result.payload).toEqual({
        uid: '12345',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'test-photo-url',
        token: 'mockToken',
      });
    });

    it('should return error on Google login failure', async () => {
      const error = new Error('Google login failed');
      (signInWithPopup as jest.Mock).mockRejectedValue(error);

      const dispatch = jest.fn();
      const thunk = loginUserWithGoogle();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual('Google login failed');
      expect(result.meta.rejectedWithValue).toBe(true);
    });
  });

  describe('logoutUser', () => {
    it('should logout successfully', async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const thunk = logoutUser();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toBeUndefined();
      expect(signOut).toHaveBeenCalledWith(auth);
    });

    it('should return error on logout failure', async () => {
      const error = new Error('Logout failed');
      (signOut as jest.Mock).mockRejectedValue(error);

      const dispatch = jest.fn();
      const thunk = logoutUser();
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual('Logout failed');
      expect(result.meta.rejectedWithValue).toBe(true);
    });
  });
});
