/* eslint-disable @typescript/no-explicit-any */
import { useFonts, type FontSource } from 'expo-font';
export const useExpoGoogleFonts = (map: any): [boolean, Error | null] => {
  const { __metadata__, useFonts: _ignored, ...rest } = map;
  return useFonts(rest as Record<string, FontSource>);
};
