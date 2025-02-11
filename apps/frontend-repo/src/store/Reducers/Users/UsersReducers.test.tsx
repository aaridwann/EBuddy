/* eslint-disable max-lines-per-function */
import { fetchUser, updateUser } from '@/store/Actions/Users';
import { loginUserWithGoogle } from '@/store/Actions/Authentication';

import { StateUserType } from './UserReducer.types';

import userReducer from '.';

describe('userSlice reducer', () => {
  let initialState: StateUserType;

  beforeEach(() => {
    initialState = {
      data: null,
      loading: false,
      error: null,
    };
  });

  it('should handle fetchUser.pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchUser.fulfilled', () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: { id: '123', name: 'John Doe' },
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.data).toEqual({ id: '123', name: 'John Doe' });
  });

  it('should handle fetchUser.rejected', () => {
    const action = {
      type: fetchUser.rejected.type,
      payload: 'Failed to fetch user',
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch user');
  });

  it('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { id: '123', name: 'Jane Doe' },
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.data).toEqual({ id: '123', name: 'Jane Doe' });
  });

  it('should handle updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      payload: 'Failed to update user',
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to update user');
  });

  it('should reset user state on loginUserWithGoogle.fulfilled', () => {
    const action = { type: loginUserWithGoogle.fulfilled.type };
    const state = userReducer(
      { data: { id: '123', name: 'Old User' }, loading: false, error: null },
      action,
    );

    expect(state).toEqual(initialState);
  });
});
