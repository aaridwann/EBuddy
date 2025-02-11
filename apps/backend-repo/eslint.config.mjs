import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.{mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      // ✅ **Style & Formatting**
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
        { 'blankLine': 'always', 'prev': '*', 'next': 'if' },
      ],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],

      // ✅ **Best Practices**
      'complexity': ['error', { 'max': 10 }],
      'max-depth': ['error', 4],
      'max-lines': ['error', 300],
      'max-params': ['error', 4],
      'no-console': 'warn',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',

      // ✅ **TypeScript-Specific Rules**
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ✅ **ES6+ Best Practices**
      'arrow-parens': ['error', 'always'],
      'prefer-template': 'error',
      'no-duplicate-imports': 'error',

      // ✅ **Import Order & Best Practices**
      'import/order': [
        'error',
        {
          'groups': [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
