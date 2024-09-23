import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: 'inline',
  loader: {
    '.snap': 'js',
    '.js': 'jsx',
  },
});
