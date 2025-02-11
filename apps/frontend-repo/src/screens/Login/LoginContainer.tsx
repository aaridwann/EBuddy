import { connect } from 'react-redux';

import { AppDispatch } from '@/store/store';

import { loginUserWithGoogle } from '../../store/Actions/Authentication/AuthenticationActions';

import LoginPage from './LoginComponent';
import { MapDispatchToPropsType, Props, StateRedux } from './Login.types';

const LoginContainer = (props: Props) => <LoginPage {...props} />;

export const mapStateToProps = (state: StateRedux): { auth: StateRedux['auth'] } => ({
  auth: state.auth,
});

export const mapDispatchToProp = (dispatch: AppDispatch): MapDispatchToPropsType => ({
  loginGoogle: () => dispatch(loginUserWithGoogle()),
});

export default connect(mapStateToProps, mapDispatchToProp)(LoginContainer);