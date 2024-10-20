# My App

This application is designed to explore foundational functionalities of Expo, alongside integration with Storybook. It incorporates [a wide range of Expo components](https://github.com/trajano/expo-experiments/pull/2) to demonstrate their practical use.

## Key Features:

1. Expo Updates: Seamless app updates with expo-update.
2. Splash Screen: Displays a custom loader tied to the expo-update process.
3. In-App Update Alerts: Notifies users if a new update is available while the app is running.
4. Push Notifications: Handles push notification registration.
5. Send Notification: Functionality for sending push notifications.
6. Internationalization (i18n): Supports language switching.
7. Theme Switching: Toggle between dark and light modes.
8. Local Authentication: Implements local authentication features.
9. Google Authentication: (Potential feature)
10. Apple Authentication: (Potential feature)

## Future Enhancements:

1. Custom Expo Update Server: Possible addition as a separate package.

## What’s Included:

1. Expo Router Screens for page structuring.
2. Asset integration for media and resources.
3. Expose Expo, NetInfo, and React Native constants and state updates via Storybook screens.
4. Screen-level Storybook stories (potentially).

## Exclusions:

1. Components: Moved to the `react-native-my-components` package.
2. Component-level stories: Managed within `react-native-my-components`.
