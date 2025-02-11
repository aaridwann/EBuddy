import { loginUserWithGoogle } from '../../store/Actions/Authentication/AuthenticationActions';

import { mapDispatchToProp, mapStateToProps } from './LoginContainer';

jest.mock('../../store/Actions/Authentication/AuthenticationActions', () => ({
  loginUserWithGoogle: jest.fn(),
}));

describe('Login container testing', () => {
  describe('MapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should return correct key of method', () => {
      expect(mapDispatchToProp(mockDispatch)).toEqual({ loginGoogle: expect.any(Function) });
    });

    it('should call dispatch login google when click', () => {
      const { loginGoogle } = mapDispatchToProp(mockDispatch);

      loginGoogle();

      expect(loginUserWithGoogle).toHaveBeenCalled();
    });
  });

  describe('MapStateToProps', () => {
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
      expect(mapStateToProps(mockState)).toEqual({ auth: mockState.auth });
    });
  });
});