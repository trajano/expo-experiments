Here is a further cleaned-up version of the README with proper links:

# Expo Experiments

Welcome to the **Expo Experiments** repository. This is a monorepo dedicated to experimenting with Expo and enhancing the development experience.

## Packages

- **`my-app`**: The core Expo application.
- **`my-text`**: An improved `<Text>` component, designed to provide a better user interface experience.
- **`my-hooks`**: React hook experiments, originally sourced from [github.com/trajano/react-hooks](https://github.com/trajano/react-hooks).
- **`my-empty`**: An empty starter project.

## Scripts

- `npm run dev`: Runs `npm run dev` on all the packages to set up an environment that has live updates. On `my-app`, it starts the Expo Development Server only; on the other packages, it starts `tsup --watch`.
- `npm start`: Starts the Expo Development Server only.
- `npm test`: Runs `npm test` on all the packages.
- `npm run lint`: Runs `npm run lint` on all the packages.
- `npm run typecheck`: Runs `npm run typecheck` on all the packages.

## Concept

- Rely on the IDE (Visual Studio Code) to manage type checks and lint checks.
- Focus on React Native for iOS and Android; no React Web support.

## Tooling

- [Lerna](https://lerna.js.org/): Used primarily for implementing the `dev` task on the root package, so the developer does not need to open multiple terminal windows to start them individually.
- [tsup](https://tsup.egoist.dev/): Used to build TypeScript libraries.

## Dropped Tooling

The following tools were evaluated but eventually dropped:

- [Bun](https://bun.sh/): Originally used but discontinued due to file locking issues on Windows.
- [Lefthook](https://github.com/evilmartians/lefthook): Initially used because of [create-react-native-library](https://github.com/callstack/react-native-builder-bob), but replaced with [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged) for simplicity.
- [create-react-native-library](https://github.com/callstack/react-native-builder-bob): Initially used but removed due to its complexity and personal preference against its opinions.
