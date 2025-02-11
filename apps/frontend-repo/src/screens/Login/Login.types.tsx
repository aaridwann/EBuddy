import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '@/store/Reducers/Authentication/Authentication.types';
import { StateUserType } from '@/store/Reducers/Users/UserReducer.types';

export interface InputData {email: string, password: string};
export interface Hooks {
  dataHandler: (_key: string, _value: string) => void,
  router: AppRouterInstance,
  error: string,
  errorHandler: (_value: string) => void
  data: InputData,
};
export interface Props {
  auth: AuthState
  loginGoogle: () => Promise<PayloadAction<any>>
};
export interface Object {[key: string] : any};
export interface MapDispatchToPropsType {
  loginGoogle: () => Promise<PayloadAction<any>>
};
export interface StateRedux {
  auth: AuthState
  user: StateUserType
};