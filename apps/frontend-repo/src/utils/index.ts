import { AxiosError } from 'axios';
import { get } from 'lodash';

const getErrorCode = (err: Partial<AxiosError>) => {
  const errorCode = get(err, 'payload.response.data.error.code', 'INTERNAL_ERROR');
  
  return errorCode;
};

export { getErrorCode };