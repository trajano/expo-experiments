import { renderRouter, screen } from 'expo-router/testing-library';
import { act } from '@testing-library/react-native';
import RootLayout from '@/app/_layout';
import { View } from 'react-native';
import { registerDevMenuItemsAsync } from '@/devmenu';

jest.mock('expo-dev-client');
jest.mock('@/devmenu', () => ({
  registerDevMenuItemsAsync: jest.fn(() => Promise.resolve()),
}));

// Mock out contexts
jest.mock('@/hooks/UserPreferences', () => ({
  WithUserPreferences: jest.fn((i: any) => i),
}));
jest.mock('@/hooks/MyBackgroundFetch', () => ({
  WithMyBackgroundFetch: jest.fn((i: any) => i),
}));
jest.mock('react-native-my-hooks', () => ({
  ...jest.requireActual('react-native-my-hooks'),
  WithNotifications: jest.fn((i: any) => i),
}));

test('RootLayout', async () => {
  const { getPathname } = renderRouter({
    _layout: jest.fn(() => <RootLayout />),
    storybook: jest.fn(() => <View />),
    splash: jest.fn(() => <View />),
    index: jest.fn(() => <View testID="faux" />),
    // this presently does not work thus would yield a console warning "(tabs)": jest.fn(() => <View/>),
    '(tabs)/index': jest.fn(() => <View />),
  });
  await act(() => Promise.resolve());
  expect(screen.getByTestId('faux')).toBeTruthy();
  expect(getPathname()).toStrictEqual('/');
});

test('ensure devmenu mock', () => {
  expect(
    registerDevMenuItemsAsync({ router: jest.fn() as any }),
  ).resolves.toBeUndefined();
});
