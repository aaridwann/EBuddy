import get from 'lodash/get';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updateUser } from '@/store/Actions/Users';

import { loginUser, logoutUser, loginUserWithGoogle } from '../../Actions/Authentication';

import { Actions, AuthState } from './Authentication.types';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  displayName: null,
  error: null,
};

const handleLoginFulfilled = (state: AuthState, action: PayloadAction<{ uid: string; email: string | null; token: string }>) => {
  state.loading = false;
  state.user = {
    uid: get(action, 'payload.uid', ''),
    email: get(action, 'payload.email', null),
  };
  state.token = get(action, 'payload.token', null);
};

const handleLoginWithGoogleFulfilled = (state: AuthState, action: PayloadAction<{ uid: string; email: string | null; token: string; displayName: string | null; photoURL: string | null }>) => {
  state.loading = false;
  state.user = {
    uid: get(action, 'payload.uid', ''),
    email: get(action, 'payload.email', null),
    displayName: get(action, 'payload.displayName', null),
    photoURL: get(action, 'payload.photoURL', null),
  };
  state.token = get(action, 'payload.token', null);
};

const handleRejected = (state: AuthState, action: Actions) => {
  state.loading = false;
  state.error = get(action, 'payload', 'Unknown error') as string;
};

const updateUserHandler = (state: AuthState, action:Actions) => {
  state.loading = false;
  state.user = {
    uid: get(action, 'payload.uid', ''),
    email: get(action, 'payload.email', null),
    displayName: get(action, 'payload.displayName', null),
    photoURL: get(action, 'payload.photoURL', null),
  };
  state.token = get(action, 'payload.token', null);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, handleLoginFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUserWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserWithGoogle.fulfilled, handleLoginWithGoogleFulfilled)
      .addCase(loginUserWithGoogle.rejected, handleRejected)
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(updateUser.fulfilled, updateUserHandler);
  },
});

export default authSlice.reducer;
