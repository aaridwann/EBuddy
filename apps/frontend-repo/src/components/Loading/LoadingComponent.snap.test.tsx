import { assertSnapshot } from '@/utils/testUtils';

import LoadingComponent from './LoadingComponent';

describe('Loading component snapshot testing', () => {
  const configs = [
    {
      props: { size: 10 },
      desc: 'Should render correct with value size 10',
    },
    {
      props: { size: 60 },
      desc: 'Should render correct with value size 60',
    },
    {
      props: {},
      desc: 'Should render correct with default value',
    },
  ];

  assertSnapshot(configs, LoadingComponent);
});