import LoadingScreen from '@/app/splash';
import { render } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useFocusEffect: jest.fn(),
}));

/**
 * This is an example of a basic test that ensures the view loads with minimal assertions.
 */
test('LoadingScreen', () => {
  const { getByTestId } = render(<LoadingScreen />);
  expect(getByTestId('splash-view')).toBeTruthy();
});
