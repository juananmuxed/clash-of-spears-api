module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  rules: {
    indent: 'off',
    'linebreak-style': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [0, {
      'packageDir ': './src/',
    }],
    'max-len': ['error', {
      code: 160,
      ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"',
      // ignore classes or svg draw attributes
      ignoreStrings: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
    }],
    
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
      multilineDetection: 'brackets',
    }],
    '@typescript-eslint/type-annotation-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-use-before-define': ['error', {
      functions: false,
    }],
    'id-length': [2, { exceptions: ['i', 'j'], properties: 'never' }],
    'no-unused-vars': 'off',
    // allow debugger during development only
    '@typescript-eslint/no-unused-vars': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
}
