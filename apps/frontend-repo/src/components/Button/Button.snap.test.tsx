import { assertSnapshot } from '@/utils/testUtils';

import UpdateButton from './Button';

describe('Button snapshot testing', () => {
  const configs = [
    {
      props: {
        onClick: jest.fn(),
        loading: false,
        error: null,
        title: 'Title button',
      },
      desc: 'should render with correct value',
    },
    {
      props: {
        onClick: jest.fn(),
        loading: false,
        error: 'Something error',
        title: 'Title button',
      },
      desc: 'should render with error',
    },
    {
      props: {
        onClick: jest.fn(),
        loading: true,
        error: null,
        title: 'Title button',
      },
      desc: 'should render with loading on',
    },
  ];

  assertSnapshot(configs, UpdateButton);
});