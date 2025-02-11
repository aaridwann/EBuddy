import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/setupTest.ts'],
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './src/components/'),
      '@/app': path.resolve(__dirname, './src/app/'),
      '@/screens': path.resolve(__dirname, './src/screens/'),
      '@/services': path.resolve(__dirname, './src/services/'),
      '@/store': path.resolve(__dirname, './src/store/'),
      '@/utils': path.resolve(__dirname, './src/utils/'),
    },
  },
});
