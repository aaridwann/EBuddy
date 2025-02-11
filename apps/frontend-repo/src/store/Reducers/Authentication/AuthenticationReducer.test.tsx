/* eslint-disable max-lines-per-function */
import { loginUser, logoutUser, loginUserWithGoogle } from '@/store/Actions/Authentication';
import { updateUser } from '@/store/Actions/Users';

import { AuthState } from './Authentication.types';

import authReducer from '.';

describe('authSlice reducer', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      user: null,
      token: null,
      loading: false,
      displayName: null,
      error: null,
    };
  });

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { uid: '123', email: 'test@example.com', token: 'mockToken' },
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual({ uid: '123', email: 'test@example.com' });
    expect(state.token).toBe('mockToken');
  });

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Invalid credentials',
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

  it('should handle loginUserWithGoogle.pending', () => {
    const action = { type: loginUserWithGoogle.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUserWithGoogle.fulfilled', () => {
    const action = {
      type: loginUserWithGoogle.fulfilled.type,
      payload: { uid: '123', email: 'google@example.com', token: 'mockGoogleToken', displayName: 'Google User', photoURL: 'mockPhotoURL' },
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual({
      uid: '123',
      email: 'google@example.com',
      displayName: 'Google User',
      photoURL: 'mockPhotoURL',
    });
    expect(state.token).toBe('mockGoogleToken');
  });

  it('should handle loginUserWithGoogle.rejected', () => {
    const action = {
      type: loginUserWithGoogle.rejected.type,
      payload: 'Google login failed',
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Google login failed');
  });

  it('should handle logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = authReducer({
      ...initialState,
      user: { uid: '123', email: 'test@example.com' },
      token: 'mockToken',
    }, action);

    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should handle logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      payload: 'Logout failed',
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Logout failed');
  });

  it('should handle updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { uid: '123', email: 'updated@example.com', displayName: 'Updated User', photoURL: 'newPhotoURL', token: 'updatedToken' },
    };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual({
      uid: '123',
      email: 'updated@example.com',
      displayName: 'Updated User',
      photoURL: 'newPhotoURL',
    });
    expect(state.token).toBe('updatedToken');
  });
});
