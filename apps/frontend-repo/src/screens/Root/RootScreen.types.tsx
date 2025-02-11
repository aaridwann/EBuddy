import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '@/store/Reducers/Authentication/Authentication.types';
import { StateUserType } from '@/store/Reducers/Users/UserReducer.types';

import { User } from '../../../../../packages/shared/src/user';

import { initialData } from './RootScreen.configs';

export interface Props {
  user: StateUserType,
  auth: AuthState
  fetchUser: () => Promise<PayloadAction<unknown>>
  updateUser: (_data: User) => Promise<PayloadAction<unknown>>,
  logoutUser: () => Promise<PayloadAction<unknown>>
};
export interface StateRedux {
  auth: AuthState
  user: StateUserType
};
export interface MapState {
  user: StateUserType,
  auth: AuthState
};
export interface MapDispatch {
  fetchUser: () => Promise<PayloadAction<unknown>>
  updateUser: (_data: User) => Promise<PayloadAction<unknown>>,
  logoutUser: () => Promise<PayloadAction<unknown>>
}
export interface HooksType {
  token: string | null,
  handleChange: (_key: string, _value: string) => void,
  formData: typeof initialData | User,
  isEditHandler: VoidFunction,
  isEdit: boolean,
  router: AppRouterInstance
}
export type HandleSubmit = (_props: Props, _hooks: HooksType) => (_e: React.ChangeEvent<any>) => void
export interface PropsEditForm {
    props: Props,
    hooks: HooksType,
    handleSubmit: HandleSubmit
}
