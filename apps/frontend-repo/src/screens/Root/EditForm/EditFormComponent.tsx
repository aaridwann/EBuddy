import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { get } from 'lodash';

import i18n from '@/localize';
import LoadingComponent from '@/components/Loading';

import { HandleSubmit, HooksType, Props, PropsEditForm } from '../RootScreen.types';
import { initialData } from '../RootScreen.configs';

import Styles from './EditFormComponent.styles';

/**
 * Get props text field
 * @param {string} key - Key of field
 * @param {string | null} value - Value of field
 * @returns {[key: string]:any} - Get props text field
 */
const _getPropsTextField = (key: string): {[key: string]: any} => ({
  key: key,
  label: key,
  fullWidth: true,
  margin: 'normal',
});

/**
 * Render form update
 * @param {Props} props - Props
 * @param {Hooks} hooks - Hooks
 * @returns {React.ReactNode} - Render form update
 */
const _renderFormUpdate = (props: Props, hooks: HooksType, _handleSubmit: HandleSubmit ): React.ReactNode => {
  const data = Object.entries(get(props, 'user.data', initialData));

  if (!data) {return <LoadingComponent/>;}

  return (
    <form onSubmit={_handleSubmit(props, hooks)}>
      {data.map(([key]) => (
        <TextField
          value={hooks.formData[key]} 
          onChange={(e) => hooks.handleChange(key, e.target.value)}
          {..._getPropsTextField(key)} 
          key={key}
        />
      ))}
      <Button type="submit" variant="contained" color="primary" sx={Styles.buttonSubmit}>{i18n.t('UPDATE_USER_DATA')}</Button>
      <Button onClick={hooks.isEditHandler} variant="contained" color='inherit' sx={Styles.buttonCancel}>{i18n.t('CANCEL')}</Button>
    </form>
  );
};

/**
 * Render edit form
 * @param {Props} props - Props
 * @param {HooksType} hooks - Hooks
 * @returns {React.ReactNode} - Render edit form
 */
const EditForm = ({ props, hooks, handleSubmit }: PropsEditForm): React.ReactNode => (
  <Container maxWidth="sm">
    <Card sx={Styles.cardWrapper}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{i18n.t('EDIT_PROFILE_TITLE')}</Typography>
        {_renderFormUpdate(props, hooks, handleSubmit)}
      </CardContent>
    </Card>
  </Container>
);

export default EditForm;