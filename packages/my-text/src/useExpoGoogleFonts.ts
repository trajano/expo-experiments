import { useFonts, type FontSource } from 'expo-font';

/**
 *
 * @param map
 * @returns
 * @example
 * import * as Nunito from '@expo-google-fonts/nunito';
 * import { useExpoGoogleFonts } from 'react-native-my-text';
 *
 * const [expoFontsLoaded] = useExpoGoogleFonts(Nunito);
 * useEffect(() => {
 *   if (loaded) {
 *     SplashScreen.hideAsync();
 *   }
 * }, [loaded]);
 */

export const useExpoGoogleFonts = (map: any): [boolean, Error | null] => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars  */
  const { __metadata__, useFonts: _ignored, ...rest } = map;
  return useFonts(rest as Record<string, FontSource>);
};
