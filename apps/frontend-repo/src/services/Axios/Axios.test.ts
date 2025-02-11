import { getAuth } from 'firebase/auth';

import AppAxios from '.';

jest.mock('firebase/auth');

const mockAuth = {
  currentUser: {
    getIdToken: jest.fn(() => Promise.resolve('mock-token')),
  },
};

describe('AppAxios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue(mockAuth);
  });

  it('should add Authorization header if user is authenticated', async () => {
    const mockConfig = { headers: {} };
    const modifiedConfig = await AppAxios.interceptors.request.handlers[0].fulfilled(mockConfig);
    expect(modifiedConfig.headers.Authorization).toBe('Bearer mock-token');
  });

  it('should not add Authorization header if user is not authenticated', async () => {
    getAuth.mockReturnValue({ currentUser: null });
    const mockConfig = { headers: {} };
    const modifiedConfig = await AppAxios.interceptors.request.handlers[0].fulfilled(mockConfig);
    expect(modifiedConfig.headers.Authorization).toBeUndefined();
  });

  it('should return response if successful', () => {
    const mockResponse = { data: { message: 'Success' } };
    const result = AppAxios.interceptors.response.handlers[0].fulfilled(mockResponse);
    expect(result).toEqual(mockResponse);
  });

//   it('should reject promise on error response', async () => {
//     const mockError = { response: { status: 500, data: 'Server Error' } };
//     console.log('====>', AppAxios.interceptors.response.handlers[1].rejected(mockError));
//     await expect(AppAxios.interceptors.response.handlers[1].rejected(mockError)).rejects.toEqual(mockError);
//   });
});
