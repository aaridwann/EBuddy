import { assertSnapshot } from '@/utils/testUtils';

import SnackbarComponent from './SnackbarComponent';

describe('SnackbarComponent snap testing', () => {
  const configs = [
    {
      props: {
        onClose: jest.fn(),
        isOpen: true,
        message: '',  
      },
      desc: 'should render when no message',
    },
    {
      props: {
        onClose: jest.fn(),
        isOpen: true,
        message: 'something error',  
      },
      desc: 'should render when no message',
    },
  ];

  assertSnapshot(configs, SnackbarComponent);
});