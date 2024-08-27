# Expo Experiments

Welcome to the **Expo Experiments** repository. This is a monorepo dedicated to experimenting with Expo and enhancing the development experience.

## Packages

- **`my-app`**: The core Expo application.
- **`my-text`**: An improved `<Text>` component, designed to provide a better user interface experience.
- **`my-hooks`**: React hook experiments, originally sourced from [github.com/trajano/react-hooks](https://github.com/trajano/react-hooks).
- **`my-empty`**: An empty starter project.

## Scripts

- `npm run dev`: Runs `npm run dev` on all packages to set up an environment with live updates. For `my-app`, it starts the Expo Development Server only; for other packages, it starts `tsup --watch`.
- `npm start`: Starts the Expo Development Server only.
- `npm test`: Runs `npm test` on all packages.
- `npm run lint`: Runs `npm run lint` on all packages.
- `npm run typecheck`: Runs `npm run typecheck` on all packages.
- `npm run build`: Runs `typecheck`, `lint`, `test`, `prepare` on all packages.

- `docker build .`: Does an `npm ci` followed by `expo prebuild` followed by Android build.

## Concept

- Rely on the IDE (Visual Studio Code) for type checking and linting.
- Focus on React Native for iOS and Android; no support for React Web.
- Use npm scripts to execute command-line tools for development.
- Tests are kept with code. But `__tests__` are also allowed for integration testing cross component boundaries.

## Tooling

All tooling is managed through npm scripts:

- [tsup](https://tsup.egoist.dev/): Used for building TypeScript libraries.
- [Turbo](https://turbo.build/): Used primarily for implementing the `dev` task in the root package, eliminating the need to open multiple terminal windows to start tasks individually.
- [Docker](???) is used to run the expo prebuild and the Android build within Docker. Only Android will be built as xcodebuild does not work inside a Docker container.

## Dropped Tooling

The following tools were evaluated but eventually dropped:

- [Lerna](https://lerna.js.org/): Initially used for implementing the `dev` task in the root package to avoid opening multiple terminal windows. However, it didn't handle Ctrl-C interruptions well.
- [Bun](https://bun.sh/): Originally used but discontinued due to file locking issues on Windows.
- [Lefthook](https://github.com/evilmartians/lefthook): Initially used due to [create-react-native-library](https://github.com/callstack/react-native-builder-bob), but replaced with [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged) for simplicity.
- [create-react-native-library](https://github.com/callstack/react-native-builder-bob): Initially used but removed due to its complexity and personal preferences against its design choices.
