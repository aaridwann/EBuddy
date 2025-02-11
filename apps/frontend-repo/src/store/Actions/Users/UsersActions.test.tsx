/* eslint-disable max-lines-per-function */
import { fetchUserData, updateUserData } from '@/apis/userApi';

import { fetchUser, updateUser } from './UsersActions';

jest.mock('@/apis/userApi', () => ({
  fetchUserData: jest.fn(),
  updateUserData: jest.fn(),
}));

describe('User Thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUser', () => {
    it('should fetch user successfully', async () => {
      const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
      (fetchUserData as jest.Mock).mockResolvedValue(mockUser);

      const dispatch = jest.fn();
      const thunk = fetchUser('mockToken');
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual(mockUser);
    });

    it('should return error on fetch failure', async () => {
      const error = new Error('Fetch failed');
      (fetchUserData as jest.Mock).mockRejectedValue(error);

      const dispatch = jest.fn();
      const thunk = fetchUser('mockToken');
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual('Fetch failed');
      expect(result.meta.rejectedWithValue).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
      (updateUserData as jest.Mock).mockResolvedValue(mockUser);

      const dispatch = jest.fn();
      const thunk = updateUser(mockUser);
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual(mockUser);
    });

    it('should return error on update failure', async () => {
      const errorMessage = 'Update failed';
      (updateUserData as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const thunk = updateUser({ id: '123', name: 'John Doe' });
      const result = await thunk(dispatch, () => {}, undefined);

      expect(result.payload).toEqual(errorMessage); // Bandingkan dengan string, bukan Error object
      expect(result.meta.rejectedWithValue).toBe(true);
    });
  });
});