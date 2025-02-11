/* eslint-disable max-lines-per-function */
import { fetchUser, updateUser } from '@/store/Actions/Users';
import { logoutUser } from '@/store/Actions/Authentication';

import { mapStateToProps, mapDispatchToProps } from './RootScreenContainer';

jest.mock('firebase/auth', () => ({ 
  connectAuthEmulator: jest.fn(), 
  getAuth: jest.fn(),
}))
  .mock('@/store/Actions/Users', () => ({
    fetchUser: jest.fn(), 
    updateUser: jest.fn(),
  }))
  .mock('@/store/Actions/Authentication', () => ({
    logoutUser: jest.fn(),
  }));

describe('Root screen container', () => {
  describe('MapStateToProp', () => {
    const mockState = {
      auth: {
        user: null,
        token: null,
        loading: false,
        error: null,
        displayName: null,
      },
      user: {
        data: null,
        loading: false,
        error: null,
      },
    };
    
    it('should return correct value', () => {
      expect(mapStateToProps(mockState)).toEqual(mockState);
    });
  });

  describe('MapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should return correct method', () => {
      expect(mapDispatchToProps(mockDispatch)).toEqual({
        fetchUser: expect.any(Function),
        updateUser: expect.any(Function),
        logoutUser: expect.any(Function),
      });
    });

    it('should call fetchUser method', () => {
      mapDispatchToProps(mockDispatch).fetchUser('1235');

      expect(fetchUser).toHaveBeenCalledWith('1235');
    });

    it('should call updateUser method', () => {
      const mockData = {
        id: '123412',
        uid: '123412',
        displayName: 'john doe',
        email: 'john_doe@mail.com',
        photoURL: 'john_doe.jg',
      };
      mapDispatchToProps(mockDispatch).updateUser(mockData);

      expect(updateUser).toHaveBeenCalledWith(mockData);
    });

    it('should call logoutUser method', () => {
      mapDispatchToProps(mockDispatch).logoutUser();

      expect(logoutUser).toHaveBeenCalledTimes(1);
    });
  });
});