import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as Nunito from '@expo-google-fonts/nunito';
import * as ComicNeue from '@expo-google-fonts/comic-neue';
import { useExpoGoogleFonts } from 'react-native-my-text';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [expoFontsLoaded] = useExpoGoogleFonts(Nunito);
  const [expoFontsLoaded2] = useExpoGoogleFonts(ComicNeue);

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
}
