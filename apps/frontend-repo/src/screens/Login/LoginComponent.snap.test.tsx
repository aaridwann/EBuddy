/* eslint-disable max-lines-per-function */
import { assertSnapshot } from '@/utils/testUtils';

import LoginComponent from './LoginComponent';

jest.mock('next/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('Login component snapshot testing', () => {
  const configs = [
    {
      props: {
        auth: {
          user: null,
          token: null,
          loading: false,
          error: null,
          displayName: null,
        },
        loginGoogle: jest.fn(),
      },
      desc: 'should render when each value of props is null',
    },
    {
      props: {
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
        loginGoogle: jest.fn(),
      },
      desc: 'should render when each value of props is not null',
    },
    {
      props: {
        auth: {
          user: {
            uid: '123456',
            displayName: 'John Doe',
            photoURL: 'https://pinterest.com/image.png',
            email: 'johndoe@mail.com',
          },
          token: 'abcdefg123456',
          loading: false,
          error: 'Something error',
          displayName: 'John Doe',
        },
        loginGoogle: jest.fn(),
      },
      desc: 'should render when error is true',
    },
    {
      props: {
        auth: {
          user: {
            uid: '123456',
            displayName: 'John Doe',
            photoURL: 'https://pinterest.com/image.png',
            email: 'johndoe@mail.com',
          },
          token: 'abcdefg123456',
          loading: true,
          error: null,
          displayName: 'John Doe',
        },
        loginGoogle: jest.fn(),
      },
      desc: 'should render when loading is true',
    },
  ];

  assertSnapshot(configs, LoginComponent);
});