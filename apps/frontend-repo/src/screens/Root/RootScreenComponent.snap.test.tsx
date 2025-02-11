/* eslint-disable max-lines-per-function */
import { assertSnapshot } from '@/utils/testUtils';

import RootScreenComponent from './RootScreenComponent';

jest.mock('next/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('RootScreenComponent snapshot testing', () => {
  const configs = [
    {
      props: {
        user: {
          data: null,
          loading: false,
          error: null,
        },
        auth: {
          user: null,
          token: null,
          loading: false,
          error: null,
          displayName: null,
        },
        fetchUser: jest.fn(),
        updateUser: jest.fn(),
        logoutUser: jest.fn(),
      },
      desc: 'should render when value of props is null',
    },
    {
      props: {
        user: {},
        auth: {
          user: null,
          token: null,
          loading: false,
          error: null,
          displayName: null,
        },
        fetchUser: jest.fn(),
        updateUser: jest.fn(),
        logoutUser: jest.fn(),
      },
      desc: 'should render when user is null',
    },
    {
      props: {
        user: {
          id: '123456',
          uid: '123456',
          displayName: 'John Doe',
          photoURL: 'https://pinterest.com/image.png',
          email: 'johndoe@mail.com',
          token: 'abcdefg123456',
          loading: false,
          error: null,
        },
        auth: {
          user: {
            uid: '123456',
            displayName: 'John Doe',
            photoURL: 'https://pinterest.com/image.png',
            email: 'johndoe@mail.com',
          },
          token: 'abcdefg123456',
          loading: false,
          error: null,
          displayName: 'John Doe',
        },
        fetchUser: jest.fn(),
        updateUser: jest.fn(),
        logoutUser: jest.fn(),
      },
      desc: 'should render when value of props is not null',
    },
  ];

  assertSnapshot(configs, RootScreenComponent);
});