import * as React from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import { Props } from './Button.types';

/**
 * Button component
 * @param {Props} props - Props
 * @returns {React.ReactNode} - Button component
 */
const UpdateButton = (props: Props): React.ReactNode => {
  const { onClick, loading, error } = props;

  return (
    <React.Fragment>
      <Button onClick={onClick} disabled={loading} variant="contained">
        {loading ? <CircularProgress size={24} /> : props.title}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </React.Fragment>
  );
};

export default UpdateButton;