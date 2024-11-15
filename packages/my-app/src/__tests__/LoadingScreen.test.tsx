import LoadingScreen from '@/app/index';
import { act, render, screen } from '@testing-library/react-native';
import { useFonts } from 'expo-font';
import { FC } from 'react';
import { Text } from 'react-native';
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useFocusEffect: jest.fn(),
}));

/**
 * This is an example of a basic test that ensures the view loads with minimal assertions.
 */
test('LoadingScreen', async () => {
  render(<LoadingScreen />);
  await act(() => Promise.resolve());
  expect(screen.getByTestId('splash-view')).toBeTruthy();
});

describe('verify mocking', () => {
  const TestComponent: FC = () => {
    const [loaded] = useFonts({
      SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });
    return <Text testID="loaded">{loaded ? 'loaded' : 'not loaded'}</Text>;
  };

  test('useFont is a mock', async () => {
    expect(jest.isMockFunction(useFonts)).toBe(true);
  });

  test('rendering', async () => {
    render(<TestComponent />);
    await act(() => Promise.resolve());
    expect(screen.getByTestId('loaded')).toBeTruthy();
    expect(screen.getByTestId('loaded').children).toStrictEqual(['loaded']);
  });
});
