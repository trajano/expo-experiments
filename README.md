# Expo Experiments

Welcome to the **Expo Experiments** monorepo, a dedicated space for experimenting with Expo and enhancing the mobile development experience. This repository hosts multiple packages focused on improving React Native workflows, component libraries, and development tools.

## Packages

- **`my-app`**: The core Expo application, featuring integrated Storybook for component testing and prototyping.
- **`react-native-my-text`**: An extended `<Text>` component that enhances user interface consistency and accessibility.
- **`react-native-my-hooks`**: A collection of custom React hooks, inspired by [trajano's react-hooks](https://github.com/trajano/react-hooks), aimed at streamlining React Native development.
- **`react-native-try-catch`**: An implementation of an error boundary for React Native, leveraging the undocumented `ErrorUtils` API for enhanced error handling.
- **`react-native-my-empty`**: A starter template for React Native projects, providing a clean slate for rapid development.
- **`eslint-config-my`**: ESLint configuration tailored specifically for this monorepo to ensure code consistency and quality.
- **`react-native-unstyled-components`**: A library of unstyled, yet fully functional components, providing a flexible base for custom design systems.

## Scripts

- `npm run dev`: Launches `npm run dev` for all packages, enabling live updates. For `my-app`, it starts the Expo Development Server, and for other packages, it initiates `tsup --watch`.
- `npm start`: Starts the Expo Development Server for `my-app`.
- `npm test`: Executes tests across all packages.
- `npm run lint`: Lints all packages to ensure consistent code quality.
- `npm run typecheck`: Runs TypeScript type checks across all packages.
- `npm run build`: Runs type checks, lints, tests, and prepares the build for all packages.
- `docker build .`: Builds the Android package inside a Docker container, starting with `npm ci` and followed by `expo prebuild`.

## Development Concepts

- **IDE-Driven**: Development relies on Visual Studio Code for type checking and linting.
- **Mobile Focus**: The monorepo is focused on React Native development for iOS and Android, with no support for React Web.
- **Automated Scripts**: npm scripts are used to streamline command-line tools for development tasks.
- **Test Integration**: Unit and integration tests are embedded within the code for closer proximity to the codebase, but `__tests__` folders are also utilized for larger integration tests across components.

## Tooling

The following tools are utilized in the development workflow:

- **[tsup](https://tsup.egoist.dev/)**: A simple bundler for building TypeScript libraries efficiently.
- **[Turbo](https://turbo.build/)**: Speeds up monorepo development tasks like running `dev` commands across multiple packages simultaneously.
- **[Docker](https://www.docker.com/)**: Manages the build environment, including Expo prebuild and Android builds within containers.
- **[commitlint](https://commitlint.js.org/)**: Enforces conventional commit messages for version control. Allowed types include: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, and `test`.
- **[React Native Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/)**: Embedded in `my-app` for component prototyping. In the future, `my-storybook` might be separated as a standalone app for better structure.

## Dependency Updates

To keep dependencies up-to-date, the following command is used (though not directly referenced):

```sh
npx -y npm-check-updates --deep -u
```

After updating, run the following in any Expo app folder to ensure compatibility:

```sh
npx expo install --fix
```

## Deprecated Tools

The following tools were evaluated but eventually replaced:

- **[Lerna](https://lerna.js.org/)**: Initially used to manage the `dev` task in the root package but discarded due to issues with handling process interruptions.
- **[Bun](https://bun.sh/)**: Discontinued due to file-locking issues on Windows.
- **[Lefthook](https://github.com/evilmartians/lefthook)**: Originally used but replaced with [Husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged) for simplicity.
- **[create-react-native-library](https://github.com/callstack/react-native-builder-bob)**: Dropped due to its complexity and a preference for more streamlined approaches.

## Shell Scripts

Custom shell scripts are utilized for local development:

- `build.sh`: Builds the project using Docker and installs the resulting APK on connected ADB devices.
- `eas-build.sh`: Builds iOS packages using Expo Application Services (EAS) using a pre-configured token and credentials.
- `eas-update.sh`: Sends the update package to Expo Application Services (EAS) using a pre-configured token and credentials.
- `e2e.sh`: Builds the using Docker and starts up Appium with connection to a local device. Then starts up the E2E tests.
- `update-deps.sh`: Automates dependency updates across the monorepo.
