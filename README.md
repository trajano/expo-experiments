# Expo Experiments

Welcome to the **Expo Experiments** repository. This is a monorepo dedicated to experimenting with Expo and enhancing the development experience.

## Packages

- **`my-app`**: The core Expo application.
- **`my-text`**: An improved `<Text>` component, designed to provide a better user interface experience.

## Scripts

- `npm run dev`: runs `npm run dev` on all the packages to set up an environment that has live updates. On the `my-app` it starts the Expo Development Server only; on the other packages it starts `tsup --watch`
- `npm start`: starts the Expo Development Server only
- `npm test`: runs `npm test` on all the packages
- `npm run lint`: runs `npm run lint` on all the packages
- `npm run typecheck`: runs `npm run typecheck` on all the packages

## Concept

- Rely on the IDE (Visual Studio Code) to manage typechecks, and lint checks
- Just react-native for iOS and Android no react web support.

## Tooling

- [Lerna](https://lerna.js.org/) is used primarily for implementing the `dev` task on the root package so the developer does not need to open up several terminal windows and start them individually
- [Bun](???) was originally used, but stopped due to issues on Windows file locking.
- [Lefthook](???) was originally used because of [create-react-native-library](???), but stopped in favor of [husky](???) and [lint-staged](???) for its simplicity
- [create-react-native-library](???) was originally used but in the end totally removed primarily due to its complexity, and secondly the bad taste it leaves on my mouth with their opinions.
