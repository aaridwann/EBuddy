'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: true,
  testResultsProcessor: 'jest-junit-reporter',
  coverageReporters: [
    'lcov',
    'text',
    'text-summary',
  ],
  collectCoverageFrom: [
    '**/**/*.ts',
    '!**/**/index.ts',
    '!jest/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '(jest).ts',
    '(config|configs).ts',
    '(validation|validations).ts',
  ],
};
