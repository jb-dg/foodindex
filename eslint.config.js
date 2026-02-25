// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    ignores: ['dist/*', 'node_modules/*', 'app-example/*', '**/*.ts', '**/*.tsx'],
  },
]);
