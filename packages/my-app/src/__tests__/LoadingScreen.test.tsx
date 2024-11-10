import LoadingScreen from '@/app/index';
import { act, render } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useFocusEffect: jest.fn(),
}));

/**
 * This is an example of a basic test that ensures the view loads with minimal assertions.
 */
test('LoadingScreen', async () => {
  const { getByTestId } = render(<LoadingScreen />);
  await act(() => Promise.resolve());
  expect(getByTestId('splash-view')).toBeTruthy();
});
