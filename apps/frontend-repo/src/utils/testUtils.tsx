import * as React from 'react';
import { render } from '@testing-library/react';

interface Configs {
  props: {[key: string]: unknown},
  desc: string
}

export const assertSnapshot = (configs: Configs[], Component: React.ElementType) => {
  configs.map(({ props, desc }) => (
    it(desc, () => {
      expect(render(<Component {...props} />)).toMatchSnapshot();
    })
  ));
};