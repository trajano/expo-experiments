import * as Font from 'expo-font';
export const useFonts = jest.mocked<typeof Font.useFonts>(
  jest.fn(() => [true, null]),
);
