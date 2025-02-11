'use client';

import React from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '@/store/Actions/Authentication';
import { fetchUser, updateUser } from '@/store/Actions/Users';
import { AppDispatch } from '@/store/store';

import { User } from '../../../../../packages/shared/src/user';

import RootScreenComponent from './RootScreenComponent';
import { MapDispatch, MapState, Props, StateRedux } from './RootScreen.types';

/**
 * Root Screen Container
 * @param {Props} props - props
 * @returns {React.ReactNode} - Root Screen Container
 */
const RootScreenContainer = (props: Props): React.ReactNode => <RootScreenComponent {...props} />;

/**
 * MapState To Props
 * @param {StateRedux} state - State of redux
 * @returns {MapState} - MapState To Props
 */
export const mapStateToProps = (state: StateRedux): MapState => ({
  user: state.user,
  auth: state.auth,
});

/**
 * MapDispatchToProps
 * @param {AppDispatch} dispatch - Dispatch method from redux
 * @returns {MapDispatch} - MapDispatchToProps
 */
export const mapDispatchToProps = (dispatch: AppDispatch): MapDispatch => ({
  fetchUser: (token: string) => dispatch(fetchUser(token)),
  updateUser: (data: User) => dispatch(updateUser(data)),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreenContainer);