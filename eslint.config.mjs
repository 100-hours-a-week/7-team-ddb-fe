import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],
    },
  },

  // TypeScript strict + stylistic configs
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
]);
