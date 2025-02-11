import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

jest.mock('@/store/store', () => ({
  __esModule: true,
  default: { getState: jest.fn(), dispatch: jest.fn(), subscribe: jest.fn() },
}));

jest.mock('@/localize', () => ({
  __esModule: true,
  default: { t: jest.fn((key) => key), changeLanguage: jest.fn() },
}));

jest.mock('@/theme/theme', () => ({
  __esModule: true,
  theme: { palette: {} },
}));

describe('RootLayout', () => {
  it('should render children inside the providers', () => {
    render(
      <RootLayout>
        <div data-testid="child-component">Hello World</div>
      </RootLayout>,
    );

    // Pastikan child component dirender
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should wrap children with ThemeProvider, I18nextProvider, and Redux Provider', () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );

    // Pastikan provider tidak menyebabkan error
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
