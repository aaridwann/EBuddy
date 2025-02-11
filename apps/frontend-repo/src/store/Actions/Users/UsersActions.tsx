import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchUserData, updateUserData } from '@/apis/userApi';

import { User } from '../../../../../../packages/shared/src/user';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const userData = await fetchUserData();
      
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: User, { rejectWithValue }) => {
    try {
      return await updateUserData(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
