import { Request, Response } from 'express';

import { notFoundHandler, errorHandler } from './errorHandler';

jest.mock('../utils', () => ({
  generateResponse: jest.fn((success, payload) => ({ success, ...payload })),
}));

describe('Error Handlers', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('notFoundHandler', () => {
    it('should return 404 with "Route not found" message', () => {
      notFoundHandler(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'ERROR_ROUTE_NOT_FOUND',
        message: 'Route not found',
      });
    });
  });

  describe('errorHandler', () => {
    it('should return 500 with "Internal Server Error" message', () => {
      const error = new Error('Unexpected error');

      errorHandler(error, req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        code: 'ERROR_INTERNAL_SEVER_ERROR',
        message: 'Internal Server Error',
      });
    });
  });
});
