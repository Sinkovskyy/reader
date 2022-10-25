module.exports = {
  extends: ['@react-native-community', 'prettier'],
  globals: {
    JSX: true,
  },
  ignorePatterns: ['Pods/', 'acceptableUsePolicy.ts'],
  overrides: [
    {
      files: ['src/**/*.tsx', 'src/**/*.ts'],
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'prefer-arrow'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/semi': 'off',
    'no-shadow': 'off',
    'no-unexpected-multiline': 'error',
    'no-var': 'error',

    'prefer-const': 'error',

    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react-native/no-inline-styles': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    semi: ['error', 'never'],
  },
}
