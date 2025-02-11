import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';

import { GetUserType, NewUser } from './userCollection.types';

const usersCollection = db.collection('users');

/**
 * Get user to collection
 * @param {string} id - Id of user
 * @returns {GetUserType} - Get user to collection
 */
export const getUserById = async (id: string): Promise<GetUserType> => {
  const doc = await usersCollection.doc(id).get();

  return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null;
};

/**
 * Update user to collection
 * @param {string} id - Id of user
 * @param {Partial<User>} data - Data modify from body request
 * @returns {User} - Update user to collection
 */
export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  await usersCollection.doc(id).update(data);

  return getUserById(id);
};

/**
 * Create new user in collection
 * @param {User} user - User data to be added
 * @returns {User} - Created user data
 */
export const createUser = async (user: NewUser): Promise<User> => {
  const userRef = usersCollection.doc(user.uid);
  await userRef.set(user);

  return getUserById(user.uid);
};
