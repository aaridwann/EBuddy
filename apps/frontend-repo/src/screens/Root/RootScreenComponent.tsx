'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { get, isNull, mapValues, toPairs } from 'lodash';
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Skeleton, Typography } from '@mui/material';

import UpdateButton from '@/components/Button/Button';
import i18n from '@/localize';
import LoadingComponent from '@/components/Loading';

import { auth } from '../../../../../packages/shared/src/firebase/firebaseConfigs';

import { HandleSubmit, HooksType, Props } from './RootScreen.types';
import { defaultAlt, defaultImage, initialData, shimmerMapContent } from './RootScreen.configs';
import EditForm from './EditForm/EditFormComponent';
import Styles from './RootScreenComponent.styles';

/**
 * AuthChanged hooks
 * @returns {HooksType} - Hooks
 */
const Hooks = (props: Props): HooksType => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = React.useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);
  const isEditHandler = React.useCallback(() => setIsEdit((prev) => !prev), []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      } else {
        router.replace('/login');
      }
    });
  }, [router]); 

  useEffect(() => {
    const data = mapValues(get(props, 'user.data'), (value) => isNull(value) ? '' : value);

    if (data) {
      setFormData(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.data]);

  return { token, handleChange, formData, isEditHandler, isEdit, router };
};

/**
 * Update handler
 * @param {Props} props - Props
 * @param {string | null} token - Token
 * @returns {VoidFunction} - Update handler
 */
export const _updateHandler = (props: Props, token: string | null): VoidFunction => () => {
  if (isNull(token)) {return;}

  props.fetchUser();
};

/**
 * Logout handler
 * @param {Props} props - Props
 * @param {HooksType} hooks - Hooks
 * @returns {VoidFunction} - Logout handler
 */
const _logoutHandler = (props: Props, hooks: HooksType): VoidFunction =>  () => {
  props.logoutUser();
  hooks.router.replace('/login');
};

/**
 * Success handler
 * @param {HooksType} hooks - Hooks
 * @returns {VoidFunction} - Success handler
 */
const _successHandler = (hooks: HooksType): VoidFunction => async () => {
  hooks.isEditHandler();
};

/**
 * Handle submit
 * @param {Props} props - Props
 * @param {HooksType} hooks - Hooks
 * @returns {VoidFunction} - Handle submit
 */
const _handleSubmit: HandleSubmit = (props: Props, hooks: HooksType) => (e: React.ChangeEvent) => {
  e.preventDefault();
  props.updateUser(hooks.formData)
    .then(_successHandler(hooks));
};

/**
 * Render avatar
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Render avatar
 */
const _renderAvatar = (props: Props): React.ReactNode => {
  const { auth: { user } } = props;
  const photoURL = get(user, 'photoURL');
  const displayName = get(user, 'displayName');

  if (!user) {return <Skeleton sx={Styles.skeleton} variant='circular' width={100} height={100} />;}

  return (
    <Avatar
      src={photoURL || defaultImage}
      alt={displayName || defaultAlt}
      sx={Styles.avatar}
    /> 
  );
};

/**
 * Render shimmering profile
 * @returns {React.ReactNode} - Render shimmering profile
 */
const _renderShimmeringProfile = (): React.ReactNode => (
  <React.Fragment>
    {shimmerMapContent.map(({ width, height }, index: number) => (
      <Skeleton key={index} sx={Styles.skeletonProfile} variant='rounded' width={width} height={height} />
    ))}
  </React.Fragment>
);

/**
 * Render card
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Render card
 */
const _renderCard = (props: Props, hooks: HooksType): React.ReactNode => {
  const { auth: { user } } = props;
  const email = get(user, 'email');
  const displayName = get(user, 'displayName');

  if (!user) {return _renderShimmeringProfile();}

  return (
    <CardContent>
      <Typography variant="h5" gutterBottom>{displayName || 'Anonymous'}</Typography>
      <Typography variant="body1" color="textSecondary">{email}</Typography>
      <Box mt={2}><Button onClick={_logoutHandler(props, hooks)} variant="contained" color="primary">{i18n.t('LOGOUT')}</Button></Box>
    </CardContent>
  );
};

/**
 * Render Button Details
 * @param {HooksType} hooks - Hooks
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Render Button Details
 */
const _renderButtonDetails = (hooks: HooksType, props: Props): React.ReactNode => {
  const title = !isNull(props.user.data) ? 'EDIT_USER_DATA': 'FETCH_USER_DATA';
  const { token, isEditHandler } = hooks;

  return (
    token && <UpdateButton 
      title={i18n.t(title)}
      loading={props.user.loading} 
      error={props.user.error} 
      onClick={isNull(props.user.data) ? _updateHandler(props, token) : isEditHandler} 
    />
  );
};

/**
 * Render details result
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Render details result
 */
const _renderDetails = (props: Props): React.ReactNode => {
  const data = get(props, 'user.data', []);
  const transformData = toPairs(data);

  return (
    transformData.map(([keyBy, value]) => (
      <React.Fragment key={keyBy}>
        <Box maxWidth='sm' sx={Styles.box}>
          <Typography variant="h5" gutterBottom>{keyBy}</Typography>
          {keyBy === 'photoURL' ? 
            <Avatar
              src={value || '/default-avatar.png'}
              alt={value || 'User'}
              sx={Styles.avatarDetails}
            />  
            : 
            <Typography variant="h6" gutterBottom>{value}</Typography>}
        </Box>
      </React.Fragment>
    ))
  );
};

/**
 * Render details content
 * @param {HooksType} hooks - Hooks
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Render details content
 */
const _renderDetailsContent = (hooks: HooksType, props: Props): React.ReactNode => (
  <Box maxWidth='sm' sx={Styles.boxDetails}>
    {_renderDetails(props)}
    {_renderButtonDetails(hooks, props)}
  </Box>
);

/**
 * Render edit form and details
 * @param {Props} props - Props
 * @param {HooksType} hooks - Hooks
 * @returns {React.ReactNode} - 
 */
const _renderEditDetails = (props: Props, hooks: HooksType): React.ReactNode => (
  hooks.isEdit ? 
    <EditForm props={props} hooks={hooks} handleSubmit={_handleSubmit} /> 
    : _renderDetailsContent(hooks, props)
);

/**
 * Render content
 * @param {Props} props - Props
 * @param {HooksType} hooks - Hooks
 * @returns {React.ReactNode} - Render content
 */
const _renderContent = (props: Props, hooks: HooksType): React.ReactNode => (
  <React.Fragment>
    <Container maxWidth="xl" sx={Styles.container} >
      <Card sx={Styles.cardContent}>
        {_renderAvatar(props)}
        {_renderCard(props, hooks)}
      </Card>
    </Container>
    <Divider sx={Styles.divider}>Details</Divider>
    {_renderEditDetails(props, hooks)}
  </React.Fragment>
);

/**
 * Root Screen Component
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Root Screen Component
 */
const RootScreenComponent = (props: Props): React.ReactNode => {
  const hooks = Hooks(props);
  const { auth } = props;

  if (!auth || isNull(hooks.token)) {return <LoadingComponent size={45}  />;}

  return _renderContent(props, hooks);
};

export default RootScreenComponent;
