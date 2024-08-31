import { loadAsync, useFonts, type FontSource } from 'expo-font';
import { useEffect, useMemo, useState } from 'react';

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

export const useExpoGoogleFonts = (
  ...fontMaps: any[]
): [boolean, Error | null] => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const consolidatedFontMap = useMemo<Record<string, FontSource>>(() => {
    return fontMaps
      .map((it) => {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars  */
        const { __metadata__, useFonts: _ignored, ...rest } = it;
        return rest as Record<string, FontSource>;
      })
      .reduce((prev, current) => ({ ...prev, ...current }), {});
  }, [fontMaps]);
  useEffect(() => {
    (async () => {
      if (loaded || error) {
        return;
      }
      try {
        await loadAsync(consolidatedFontMap);
        setLoaded(true);
      } catch (e: unknown) {
        setError(e as Error);
      }
    })();
  }, [consolidatedFontMap, loaded, error]);
  return [loaded, error];
};
