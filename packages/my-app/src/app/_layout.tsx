import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { SplashScreen, Stack, useRouter } from 'expo-router';
import { FC, useEffect } from 'react';

import { WithMyBackgroundFetch } from '@/hooks/MyBackgroundFetch';
import { BACKGROUND_FETCH_TASK, BACKGROUND_NOTIFICATION_TASK } from '@/tasks';
import { WithUserPreferences } from '@/hooks/UserPreferences';
import { useColorScheme } from 'react-native';
import { WithNotifications } from 'react-native-my-hooks';

import 'react-native-reanimated';
import { registerDevMenuItemsAsync } from '@/devmenu';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const RootLayout: FC = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  // useLoadGuard
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      // before hiding the splashscreen the fonts and assets for the loader screen should be loaded
      await registerDevMenuItemsAsync({ router });
      await SplashScreen.hideAsync();
      // this may be moved to load guard.
    })();
  }, [router]);

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
