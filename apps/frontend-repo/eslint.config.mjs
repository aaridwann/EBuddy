import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
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
        { 'blankLine': 'always', 'prev': 'if', 'next': '*' },
        { 'blankLine': 'always', prev: '*', next: 'try' },
        { 'blankLine': 'always', 'prev': 'function', 'next': 'function' },
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
      'no-dupe-keys': 'error',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Abaikan argumen fungsi dengan prefix "_"
          varsIgnorePattern: '^_', // Abaikan variabel dengan prefix "_"
          caughtErrorsIgnorePattern: '^_', // Abaikan error handler dengan prefix "_"
          ignoreRestSiblings: true, // Abaikan variabel yang tidak digunakan dalam destrukturisasi
        },
      ],

      // ✅ **TypeScript-Specific Rules**
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ✅ **ES6+ Best Practices**
      'arrow-parens': ['error', 'always'],
      'prefer-template': 'error',
      'no-duplicate-imports': 'error',
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],

      // ✅ **Import Order & Best Practices**
      'import/order': [
        'error',
        {
          'groups': [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      // 🔹 Best Practices
      'no-debugger': 'error', // Blokir debugger di produksi

      // 🔹 Code Style

      // 🔹 React Rules
      'react/react-in-jsx-scope': 'off', // Tidak perlu impor React di Next.js
      'react/prop-types': 'off', // Tidak wajib pakai PropTypes (karena pakai TypeScript)
      'react/jsx-boolean-value': ['error', 'never'], // Gunakan boolean props tanpa `={true}`
      'react/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'never' }], // Hindari `{}` yang tidak perlu
      'react/self-closing-comp': 'error', // Paksa elemen kosong pakai self-closing tag

      // 🔹 Next.js Rules
      '@next/next/no-img-element': 'off', // Izinkan penggunaan `<img>` standar selain `next/image`
      '@next/next/no-html-link-for-pages': 'off', // Izinkan penggunaan `<a href>` tanpa `next/link`

      // 🔹 TypeScript Rules
      '@typescript-eslint/explicit-function-return-type': 'off', // Tidak perlu pakai return type eksplisit di function
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Paksa pakai `interface` daripada `type`
    },
  },
];

export default eslintConfig;
