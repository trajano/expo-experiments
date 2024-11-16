import * as Expo from 'expo';
export const requireNativeModule = jest.mocked<
  typeof Expo.requireNativeModule<any>
>(jest.fn(() => jest.fn()));
export const requireOptionalNativeModule = jest.mocked<
  typeof Expo.requireOptionalNativeModule<any>
>(jest.fn(() => null));
export const isRunningInExpoGo = () => false;
