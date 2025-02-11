'use client';

import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { get, isEmpty } from 'lodash';;

import i18n from '@/localize';
import SnackbarComponent from '@/components/Snackbar/SnackbarComponent';
import LoadingComponent from '@/components/Loading';

import { auth } from '../../../../../packages/shared/src/firebase/firebaseConfigs';

import { Hooks, Props } from './Login.types';
import Configs from './LoginComponent.configs';
import Styles from './LoginComponent.styles';

const { _getPropsButton } = Configs;

/**
 * Hooks use login
 * @returns {Hooks} - Hooks
 */
const useLogin = (): Hooks => {
  const router = useRouter();
  const [data, setData] = React.useState(Configs.defaultData);
  const [error, setError] = React.useState('');

  const dataHandler = React.useCallback((key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const errorHandler = React.useCallback((value: string) => {
    setError(() => value);
  },[]);

  return { dataHandler, router, data, error, errorHandler };
};

/**
 * Handle login with email
 * @param {Hooks} hooks - Hooks
 * @returns {VoidFunction} - Handle login with email
 */
const handleLoginWithEmail = (hooks: Hooks): VoidFunction => async () => {
  const { data: { email, password }, router, errorHandler } = hooks;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push('/');
  } catch (error: any) {
    errorHandler(error.message);
  }
};

/**
 * Handle login with google
 * @param {Props} props - Props
 * @param {Hooks} hooks - Hooks
 * @returns {VoidFunction} - Handle login with google
 */
const handleLoginWithGoogle = (props: Props, hooks: Hooks): VoidFunction => async () => {
  const { router, errorHandler } = hooks;

  try {
    await props.loginGoogle().unwrap();
    router.push('/');
  } catch (err) {
    const errMessage = get(err, 'response.data.error.code', 'INTERNAL_ERROR');
    errorHandler(errMessage);
  }
};

/**
 * Render title
 * @returns {React.ReactNode} - Render title
 */
const _renderTitle = (): React.ReactNode => (
  <Typography variant="h5" align="center" gutterBottom>
    Login
  </Typography>
);

/**
 * Render form
 * @param {Hooks} hooks - Hooks
 * @returns {React.ReactNode} - Render form
 */
const _renderForm = (hooks: Hooks): React.ReactNode => {
  const { data: { email, password } } = hooks;

  return (
    <React.Fragment>
      {Configs.inputFormConfigs.map((props: {[key: string]: any}) => (
        <TextField 
          {...props}
          error={hooks.error}
          key={props.label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => hooks.dataHandler(props.name, e.target.value)} 
          value={props.label === 'Email' ? email : password}
        />
      ))}
      <Button {..._getPropsButton} onClick={handleLoginWithEmail(hooks)}>
        Login
      </Button>
    </React.Fragment>
  );
};

/**
 * Render OAuth
 * @param {Props} props - Props
 * @param {Hooks} hooks - Hooks
 * @returns {React.ReactNode} - Render OAuth
 */
const _renderOAuth = (props: Props, hooks: Hooks): React.ReactNode => (
  <Button
    fullWidth
    variant="outlined"
    color="inherit"
    startIcon={<GoogleIcon />}
    onClick={handleLoginWithGoogle(props, hooks)}
  >
    {i18n.t('LOGIN_WITH_GOOGLE')}
  </Button>
);

/**
 * render Snackbar error
 * @param {Hooks} hooks - Hooks
 * @returns {React.ReactNode} - render Snackbar error
 */
const _renderSnackbar = (hooks: Hooks): React.ReactNode => (
  <SnackbarComponent message={i18n.t(hooks.error)} isOpen={!isEmpty(hooks.error)} onClose={() => hooks.errorHandler('')}  />
);

/**
 * Login page component
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Login page component
 */
const LoginPage = (props: Props): React.ReactNode => {
  const hooks = useLogin();

  return (
    <React.Suspense fallback={<LoadingComponent/>}>
      <CssBaseline />
      {_renderSnackbar(hooks)}
      <Container maxWidth="xs" sx={Styles.containerWrapper}>
        <Box sx={Styles.box}>
          {_renderTitle()}
          {_renderForm(hooks)}
          <Divider sx={Styles.divider}>or</Divider>
          {_renderOAuth(props, hooks)}
        </Box>
      </Container>
    </React.Suspense>
  );
};

LoginPage.displayName = Configs.displayName;

export default LoginPage;
