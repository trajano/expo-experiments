import { readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import type { Config } from '@jest/types';

const packagesDir = resolve('./packages');
const projects: Config.InitialOptions['projects'] = readdirSync(packagesDir, {
  withFileTypes: true,
})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => {
    const packageJsonPath = join(packagesDir, dirent.name, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return { dirent, packageJson };
  })
  .filter(({ packageJson }) => !!packageJson.jest)
  .map(({ dirent, packageJson }) => ({
    ...packageJson.jest,
    rootDir: join(packagesDir, dirent.name),
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      ...packageJson.jest.moduleNameMapper, // preserve existing mappers if any
    },
  }));

const config: Config.InitialOptions = {
  projects,
};

export default config;
