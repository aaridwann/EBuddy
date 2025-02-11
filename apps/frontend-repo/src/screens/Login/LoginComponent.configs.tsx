import { Object } from './Login.types';

const inputFormConfigs = [
  {
    fullWidth: true,
    name: 'email',
    label: 'Email',
    variant: 'outlined',
    margin: 'normal',
  },
  {
    fullWidth: true,
    name: 'password',
    type: 'Password',
    label: 'Password',
    variant: 'outlined',
    margin: 'normal',
  },
];
const displayName = 'LoginComponent';
const defaultData = {
  email: '',
  password: '',
};

const _getPropsButton: {[key: string]: boolean | string | Object} = {
  fullWidth: true,
  variant: 'contained',
  color: 'primary',
  sx: { mt: 2 },
};

export default { 
  inputFormConfigs, 
  displayName, 
  defaultData, 
  _getPropsButton, 
};