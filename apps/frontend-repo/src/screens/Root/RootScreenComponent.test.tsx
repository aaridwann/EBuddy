/* eslint-disable max-lines-per-function */
 
import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import UserProfile, { _updateHandler } from './RootScreenComponent'; // Sesuaikan dengan path komponen

jest.mock('@/store/Actions/Users', () => ({
  updateUser: jest.fn(),
  fetchUser: jest.fn(),
}))
  .mock('@/store/Actions/Authentication', () => ({
    logoutUser: jest.fn(),
  }))
  .mock('next/navigation', () => ({
    __esModule: true,
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
    }),
  }))
  .mock('../../../../../packages/shared/src/firebase/firebaseConfigs', () => ({
    auth: jest.fn(),
  }))
  .mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      currentUser: { uid: 'test-user', email: 'test@example.com' },
    })),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ uid: 'test-user', email: 'test@example.com', getIdToken: jest.fn().mockResolvedValue('mockToken') });

      return jest.fn(); // Simulasi fungsi unsubscribe
    }),
    signOut: jest.fn(() => Promise.resolve()),
  }));

const user = {
  data: {
    id: '123456',
    uid: '123456',
    displayName: 'John Doe',
    email: 'john@example.com',
    photoURL: 'avatar-url',
  },
  loading: false,
  error: null,
};
const auth = {
  user: {
    id: '123456',
    uid: '123456',
    displayName: 'John Doe',
    photoURL: 'https://pinterest.com/image.png',
    email: 'johndoe@mail.com',
  },
  token: 'abcdefg123456',
  loading: false,
  error: null,
  displayName: 'John Doe',
};
const props = {
  user,
  auth,
  fetchUser: jest.fn(),
  updateUser: jest.fn().mockResolvedValue({ message: 'success' }),
  logoutUser: jest.fn(),
};

describe('UserProfile Component', () => {
  it('should edit', async () => {
    await act(async () => {
      render(<UserProfile {...props} />);
    });

    fireEvent.click(await screen.findByText('Edit user data'));

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(5);
    expect(screen.getByText(/update user data/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('displayName'), { target: { value: 'john test' } });
    fireEvent.click(screen.getByText(/update user data/i));

    expect(props.updateUser).toHaveBeenCalledWith({ 
      'displayName': 'john test', 
      'email': 'john@example.com', 
      'id': '123456', 
      'photoURL': 'avatar-url', 
      'uid': '123456', 
    });
  });

  it('should correct flow of logout', async () => {
    await act(async () => {
      render(<UserProfile {...props} />);
    });

    fireEvent.click(screen.getByText(/logout/i));
    
    expect(props.logoutUser).toHaveBeenCalled();
    expect(useRouter().replace).toHaveBeenCalledWith('/login');
  });

  it('should correct flow fetch user data', async () => {
    const newProps = {
      user: {
        data: null,
        loading: false,
        error: null,
      },
      auth,
      fetchUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue({ message: 'success' }),
      logoutUser: jest.fn(),
    };

    await act(async () => {
      render(<UserProfile {...newProps} />);
    });

    fireEvent.click(screen.getByText(/Fetch user data/i));

    expect(newProps.fetchUser).toHaveBeenCalled();
  });
});

describe('_updateHandler', () => {
  it('should be return when no have a token', () => {
    expect(_updateHandler(props, null)()).toBeUndefined();
  });

  it('should call props fetch user when have a token', () => {
    _updateHandler(props, 'MockToken')();

    expect(props.fetchUser).toHaveBeenCalled();
  });
});
