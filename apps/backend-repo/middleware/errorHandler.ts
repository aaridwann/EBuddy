import { Request, Response } from 'express';

import { generateResponse } from '../utils';

/**
 * Not found handler utils
 * @param {Request} req - Request method from express
 * @param {Response} res - Response method from express
 * @return {void} - Not found handler utils
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json(generateResponse(false, { code: 'ERROR_ROUTE_NOT_FOUND', message: 'Route not found' }));
};

/**
 * Error handler utils
 * @param {Request} req - Request method from express
 * @param {Response} res - Response method from express
 * @return {void} - Error handler utils
 */
export const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500).json(generateResponse(false, { code: 'ERROR_INTERNAL_SEVER_ERROR', message: 'Internal Server Error' }));
};
