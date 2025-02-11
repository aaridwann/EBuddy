/* eslint-disable max-lines-per-function */
import AppAxios from '@/services/Axios';

import { fetchUserData, updateUserData, createUserData } from './userApi';

jest.mock('@/services/Axios');

describe('User API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user data successfully', async () => {
    const mockData = { id: 1, name: 'John Doe', email: 'john@example.com' };
    AppAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchUserData();
    expect(result).toEqual(mockData);
    expect(AppAxios.get).toHaveBeenCalledWith('/fetch-user-data');
  });

  it('should handle error when fetching user data', async () => {
    jest.spyOn(AppAxios, 'get').mockRejectedValueOnce({
      response: { data: { message: 'Fetch failed' } },
    });

    await expect(fetchUserData()).rejects.toThrow('Fetch failed');;
    expect(AppAxios.get).toHaveBeenCalledWith('/fetch-user-data');
  });

  it('should update user data successfully', async () => {
    const updateData = { name: 'Jane Doe' };
    AppAxios.put.mockResolvedValueOnce({ data: updateData });

    const result = await updateUserData(updateData);
    expect(result).toEqual(updateData);
    expect(AppAxios.put).toHaveBeenCalledWith('/update-user-data', updateData);
  });

  it('should handle error when updating user data', async () => {
    jest.spyOn(AppAxios, 'put').mockRejectedValueOnce({
      response: { data: { message: 'Update failed' } },
    });

    await expect(updateUserData({ name: 'Jane Doe' })).rejects.toThrow('Update failed');
    expect(AppAxios.put).toHaveBeenCalledWith('/update-user-data', { name: 'Jane Doe' });
  });

  it('should create new user successfully', async () => {
    const token = 'mock-token';
    const userData = { name: 'New User' };
    AppAxios.post.mockResolvedValueOnce({ data: userData });

    const result = await createUserData(token, userData);
    expect(result).toEqual(userData);
    expect(AppAxios.post).toHaveBeenCalledWith('create-user-data', userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  it('should handle error when creating a new user', async () => {
    const token = 'mock-token';
    jest.spyOn(AppAxios, 'post').mockRejectedValueOnce({
      response: { data: { message: 'Create failed' } },
    });

    await expect(createUserData('mock-token', { name: 'New User'  })).rejects.toThrow('Create failed');
    expect(AppAxios.post).toHaveBeenCalledWith('create-user-data', { name: 'New User' }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
});