import React from 'react';
import Snackbar from '@mui/material/Snackbar';

import { Props } from './SnackbarComponent.types';

const SnackbarComponent = (props: Props) => {
  return (
    <Snackbar
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.isOpen}
      onClose={props.onClose}
      message={props.message}
      key={`${props.message}_snackbar`}
    />
  );
};

export default SnackbarComponent;