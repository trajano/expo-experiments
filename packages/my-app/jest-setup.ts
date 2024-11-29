import '@shopify/flash-list/jestSetup';
import { setProjectAnnotations } from '@storybook/react';

import fs from 'fs';
import path from 'path';

const animationsDir = path.resolve(__dirname, './src/assets/animations');
const files = fs.readdirSync(animationsDir);
files
  .map((file) => `@/assets/animations/${file}`)
  .forEach((file) => {
    jest.mock(file, () => jest.fn());
  });

setProjectAnnotations([]);
