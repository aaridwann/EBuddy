import { createAsyncThunk } from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { get, pick } from 'lodash';

import { createUserData } from '@/apis/userApi';

import { auth } from '../../../../../../packages/shared/src/firebase/firebaseConfigs';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      return { uid: userCredential.user.uid, email: userCredential.user.email, token };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUserWithGoogle = createAsyncThunk(
  'auth/loginUserWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      const isNewUser = get(userCredential, '_tokenResponse.isNewUser', false);
      const userData = pick(userCredential.user, ['uid', 'email', 'displayName', 'photoURL']);

      if (isNewUser) {
        await createUserData(token, userData);
      }

      return { ...userData, token };
    } catch (error: any) {

      if (error?.code === 'auth/cancelled-popup-request') {
        return rejectWithValue(null); // Tidak kirim error ke Redux, hanya abaikan
      }

      const errorMessage = error?.message || 'Login failed. Please try again.';

      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
