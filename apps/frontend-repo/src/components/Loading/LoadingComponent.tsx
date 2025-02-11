import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { Props } from './LoadingComponent.types';
import Styles from './LoadingComponent.styles';

const LoadingComponent = (props: Props) => {
  return (
    <Box sx={Styles.box}>
      <CircularProgress size={props.size || 40} />
    </Box>
  );
};

export default LoadingComponent;