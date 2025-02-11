'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import store from '@/store/store';
import i18n from '@/localize';
import { theme } from '@/theme/theme';

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n} defaultNS="translation">
          <body>
            <Provider store={store}>{children}</Provider>
          </body>
        </I18nextProvider>
      </ThemeProvider>
    </html>
  );
}
