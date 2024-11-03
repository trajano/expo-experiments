import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { SplashScreen, Stack } from 'expo-router';
import { FC, useEffect } from 'react';

import { WithMyBackgroundFetch } from '@/hooks/MyBackgroundFetch';
import { BACKGROUND_FETCH_TASK, BACKGROUND_NOTIFICATION_TASK } from '@/tasks';
import { WithUserPreferences } from '@/hooks/UserPreferences';
import { useColorScheme } from 'react-native';
import { WithNotifications } from 'react-native-my-hooks';
import { DevMenu } from 'expo-dev-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearLogFilesAsync } from '@/logging';

import '@/devMenu';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout: FC = () => {
  const colorScheme = useColorScheme();
  // useLoadGuard
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // before hiding the splashscreen the fonts and assets for the loader screen should be loaded
      await SplashScreen.hideAsync();
      await DevMenu.registerDevMenuItems([
        {
          name: 'Clear AsyncStorage',
          callback: () => {
            AsyncStorage.clear();
          },
          shouldCollapse: true,
        },
        {
          name: 'Clear Log files',
          callback: () => {
            clearLogFilesAsync();
          },
          shouldCollapse: true,
        },
      ]);
      // this may be moved to load guard.
    })();
  }, []);

  // if (!loaded), but I want it already on the stack right?
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="storybook" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
};
export type MyAppUserPreferences = {
  locale: string;
  theme: string;
  count: number;
};
// with load guard?
const CompositeApp = WithMyBackgroundFetch(
  WithUserPreferences(WithNotifications(RootLayout)),
);
const MyApp = () => (
  <CompositeApp
    backgroundFetchTaskName={BACKGROUND_FETCH_TASK}
    notificationTaskName={BACKGROUND_NOTIFICATION_TASK}
    stopOnTerminate={false}
    startOnBoot={true}
    userPreferencesStorageKey="myAppStorage"
    userPreferencesInitial={
      {
        locale: '',
        theme: '',
        count: 0,
      } as MyAppUserPreferences
    }
  />
);

export default MyApp;
