import { createSlice } from '@reduxjs/toolkit';

import { loginUserWithGoogle } from '@/store/Actions/Authentication';

import { fetchUser, updateUser } from '../../Actions/Users';

import { StateUserType } from './UserReducer.types';

const initialState: StateUserType = {
  data: null,
  loading: false,
  error: null,
};

const _resetUserHandler = () => {
  return initialState;
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUserWithGoogle.fulfilled, _resetUserHandler);
  },
});

export default userSlice.reducer;
