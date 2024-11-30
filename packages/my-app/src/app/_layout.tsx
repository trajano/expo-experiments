import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { SplashScreen, Stack, useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';

import { WithMyBackgroundFetch } from '@/hooks/MyBackgroundFetch';
import {
  BACKGROUND_NOTIFICATION_TASK,
  CLEAN_CACHE_DIRECTORY_TASK,
} from '@/tasks';
import { WithUserPreferences } from '@/hooks/UserPreferences';
import { useColorScheme } from 'react-native';
import { WithNotifications } from 'react-native-my-hooks';

import 'react-native-reanimated';
import { registerDevMenuItemsAsync } from '@/devmenu';
import { useShakeDetection, WithShakeDetection } from '@/hooks/ShakeDetection';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const RootLayout: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { addListener: addShakeListener } = useShakeDetection();

  useEffect(() => {
    const shakeSubscription = addShakeListener(() => {
      if (!__DEV__) {
        router.navigate('/_sitemap');
      }
    });
    (async () => {
      // before hiding the splashscreen the fonts and assets for the loader screen should be loaded
      await registerDevMenuItemsAsync({ router });
      setLoaded(true);
      // this may be moved to load guard.
    })();
    return () => {
      shakeSubscription.remove();
    };
  }, [router, addShakeListener]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
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
const CompositeApp = WithShakeDetection(
  WithMyBackgroundFetch(WithUserPreferences(WithNotifications(RootLayout))),
);
const MyApp = () => (
  <CompositeApp
    shakeDetectionDisabled={__DEV__}
    backgroundFetchTaskNames={[CLEAN_CACHE_DIRECTORY_TASK]}
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
