import { curlCommand } from './sharePushCurlCommandAsync';

jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
}));
jest.mock('expo-sharing', () => ({
  shareAsync: jest.fn(() => Promise.resolve()),
}));
jest.mock('expo-file-system');
jest.mock('expo-file-system', () => {});

test('curlCommand', () => {
  const command = curlCommand({ type: 'expo', data: 'foo' });

  // Ensure that the mock command contains 'content-available' or the appropriate value
  expect(command).toContain('contentAvailable');
});
