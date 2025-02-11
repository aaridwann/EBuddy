import { DataOrError } from './utils.types';

/**
 * Generate Response
 * @param success 
 * @param dataOrError 
 * @returns 
 */
export const generateResponse = (success: boolean, dataOrError: DataOrError) => {
  if (success) {
    return {
      success: true,
      data: dataOrError,
    };
  }

  return {
    success: false,
    error: {
      code: dataOrError.code || 500,
      message: dataOrError.message || 'Unknown error',
    },
  };
};
