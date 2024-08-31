import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { FC, useEffect } from 'react';
import 'react-native-reanimated';

import * as ComicNeue from '@expo-google-fonts/comic-neue';
import * as Nunito from '@expo-google-fonts/nunito';
import { useColorScheme } from 'react-native';
import { useExpoGoogleFonts } from 'react-native-my-text';
import { useNotifications } from 'react-native-my-hooks';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout: FC = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [expoFontsLoaded] = useExpoGoogleFonts(Nunito);
  const [expoFontsLoaded2] = useExpoGoogleFonts(ComicNeue);

  const notificationInfo = useNotifications();

  useEffect(() => {
    if (loaded && expoFontsLoaded && expoFontsLoaded2) {
      SplashScreen.hideAsync();
    }
  }, [loaded, expoFontsLoaded, expoFontsLoaded2]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
};
export default RootLayout;
