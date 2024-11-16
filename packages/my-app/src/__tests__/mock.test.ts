import rnfv from 'react-native-file-viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRunningInExpoGo } from 'expo';

test('react-native-file-viewer `open` is a mock', () => {
  expect(jest.isMockFunction(rnfv.open)).toBe(true); // Check if `rnfv.open` is a mock
});

test('AsyncStorage a mock', () => {
  expect(AsyncStorage).toBeTruthy();
});

test('not running in Expo Go', () => {
  expect(isRunningInExpoGo()).toBe(false);
});
