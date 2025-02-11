import request from 'supertest';
import express from 'express';

import Constants from '../constans';

import router from './userRoutes';

// Mock Middleware
jest.mock('../middleware/authMiddleware.ts', () => ({
  authMiddleware: (req, res, next) => next(),
}));

// Mock Controller
jest.mock('../controller/api.ts', () => ({
  fetchUserData: jest.fn((req, res) => res.json({ id: '123', name: 'John Doe' })),
  updateUserData: jest.fn((req, res) => res.json({ success: true })),
}));

const app = express();
app.use(express.json());
app.use(router);

const {
  PATH_NAME: { FETCH_USER, UPDATE_USER },
} = Constants;

describe('API Routes', () => {
  it('should fetch user data successfully', async () => {
    const response = await request(app).get(FETCH_USER);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '123', name: 'John Doe' });
  });

  it('should update user data successfully', async () => {
    const response = await request(app)
      .put(UPDATE_USER)
      .send({ name: 'Updated Name' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
