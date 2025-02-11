const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(redux-persist-transform-encrypt)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Jika menggunakan alias @ untuk import
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/jest',
    '<rootDir>/scripts',
    '<rootDir>/build',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!jest/**/*.tsx',
    '!scripts/**/*.tsz',
    '!src/**/index.tsx',
    '!src/**/index.ts',
    '!src/**/page.tsx',
  ],
  testResultsProcessor: 'jest-junit-reporter',
  coverageReporters: [
    'lcov',
    'text',
    'text-summary',
  ],
  coveragePathIgnorePatterns: [
    '(story|stories).js',
    '(type|types).js',
    '(type|types).jsx',
    '(style|styles).js',
    '(style|styles).jsx',
  ],
  cacheDirectory: '/tmp',
};

module.exports = createJestConfig(customJestConfig);
