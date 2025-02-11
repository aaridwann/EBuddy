import request from 'supertest';
import express from 'express';

import userRoutes from '../routes';
import { notFoundHandler, errorHandler } from '../middleware/errorHandler';

jest.mock('../repository/userCollection', () => ({
  getUserById: jest.fn().mockResolvedValue({
    name: 'yuyun',
  }),
}));

describe('Express Server', () => {
  let app: express.Express;

  beforeEach(() => {
    process.env.BYPASS_AUTH = 'true';
    app = express();
    app.use(express.json());
    app.use('/', userRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'ERROR_ROUTE_NOT_FOUND', message: 'Route not found' },
    });
  });
});
