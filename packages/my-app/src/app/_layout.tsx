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
import '@/logging';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout: FC = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      await DevMenu.registerDevMenuItems([
        {
          name: 'Clear AsyncStorage',
          callback: async () => {
            await AsyncStorage.clear();
          },
          shouldCollapse: true,
        },
        {
          name: 'Clear Log files',
          callback: async () => {
            await clearLogFilesAsync();
          },
          shouldCollapse: true,
        },
      ]);
      await SplashScreen.hideAsync();
    })();
  }, []);

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
