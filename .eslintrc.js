module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/strict',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-magic-numbers": "off",
    'prettier/prettier': 'warn',
    "unused-imports/no-unused-imports": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/await-thenable': 'error',
    "@typescript-eslint/no-magic-numbers": "error",
    '@typescript-eslint/no-extraneous-class': 'off', // turn back on in prod
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off', // needs strict null checks on which breaks tests
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // needs strict null checks on which breaks tests
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		],
  },
};