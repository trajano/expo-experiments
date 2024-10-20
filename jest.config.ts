/**
 * Jest configuration file for a monorepo setup.
 *
 * This configuration dynamically generates Jest configurations for each package within the `./packages` directory.
 *
 * - Scans the `./packages` directory to find all subdirectories representing individual packages.
 * - Reads the `package.json` file of each package to determine if it has a Jest configuration (`jest` key).
 * - For packages with a Jest configuration, it creates a project-specific Jest config:
 *    - Sets the `rootDir` to the package's directory.
 *    - Adds a `moduleNameMapper` to map `@/` to the package's `src` directory, preserving any existing mappings.
 * - Combines all individual package configurations into a single Jest config using the `projects` key.
 *
 * This setup allows for isolated and consistent testing environments for each package within the monorepo.
 */
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
