import StorybookScreen from '@/app/storybook';
import { act, render, screen } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useFocusEffect: jest.fn(),
}));
jest.mock('@sb/index', () => 'StoryBookUI');
jest.mock('uuid', () => {});
jest.mock('@storybook/addon-ondevice-notes/register');
jest.mock('@storybook/addon-ondevice-controls/register');
jest.mock('@storybook/addon-ondevice-backgrounds/register');
jest.mock('@storybook/addon-ondevice-actions/register');
test('StorybookScreen', async () => {
  render(<StorybookScreen />);
  await act(() => Promise.resolve());
  expect(screen.findByTestId('storybook-ui')).toBeTruthy();
});
