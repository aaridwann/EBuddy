import AppAxios from '@/services/Axios';

import { User } from '../../../../packages/shared/src/user';

import { FetchUserType } from './userApi.types';

/**
 * Fetch user data to backend
 * @returns {FetchUserType} - Fetch user data to backend
 */
export const fetchUserData = async (): FetchUserType => {
  try {
    const response = await AppAxios.get('/fetch-user-data');

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};
/**
 * Update user data
 * @param {Partial<User>} data - Data update
 * @returns {Promise<FetchUserType>}
 */
export const updateUserData = async (data: Partial<User>): Promise<FetchUserType> => {
  try { 
    const response = await AppAxios.put('/update-user-data', data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user data');
  }
};
/**
 * Create new user
 * @param {string} token - token
 * @param {any} userData - user data
 * @returns {}
 */
export const createUserData = async (token: string, userData: any): FetchUserType => {

  try {
    const response = await AppAxios.post('create-user-data', userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
    
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create user data');
  }
};