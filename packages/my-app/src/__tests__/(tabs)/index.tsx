import Index from '@/app/(tabs)/index';
import { Linking } from 'react-native';
import { render, act, fireEvent } from '@testing-library/react-native';
import { Router, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));
test('(tabs)/index', () => {
  const mockRouter: Partial<jest.Mocked<Router>> = {
    back: jest.fn(),
    push: jest.fn(),
  };
  jest.mocked(useRouter).mockReturnValue(mockRouter as Router);

  const { getByTestId } = render(<Index />);
  expect(getByTestId('open-settings-button')).toBeTruthy();
  fireEvent.press(getByTestId('open-settings-button'));
  expect(Linking.openSettings).toHaveBeenCalled();

  act(() => {
    fireEvent.press(getByTestId('go-load-button'));
  });
  expect(mockRouter.back).toHaveBeenCalled();

  act(() => {
    fireEvent.press(getByTestId('go-sitemap-button'));
  });
  expect(mockRouter.push).toHaveBeenCalledWith('/_sitemap');

  act(() => {
    fireEvent.press(getByTestId('go-storybook-button'));
  });
  expect(mockRouter.push).toHaveBeenCalledWith('/storybook');

  expect(getByTestId('press-count').props.children).toBe(3);
});

test('(tabs)/index console log', () => {
  const consoleErrorMock = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  const { getByTestId } = render(<Index />);
  fireEvent.press(getByTestId('log-something-button'));
  expect(consoleErrorMock).toHaveBeenCalledWith('error log');
  consoleErrorMock.mockReset();
});

test('(tabs)/index share curl', () => {
  const { getByTestId } = render(<Index />);
  fireEvent.press(getByTestId('share-curl-command-button'));
  expect(FileSystem.writeAsStringAsync).toHaveBeenCalledWith(
    expect.anything(),
    expect.anything(),
    { encoding: 'utf8' },
  );
});
