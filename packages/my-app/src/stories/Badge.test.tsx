import { composeStories } from '@storybook/react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as stories from './Badge.stories';

jest.mock('expo-notifications', () => {
  let currentBadgeCount = 0;
  return {
    ...jest.requireActual('expo-notifications'),
    getBadgeCountAsync: jest.fn(() => Promise.resolve(currentBadgeCount)),
    setBadgeCountAsync: jest.fn((nextBadgeCount) => {
      currentBadgeCount = nextBadgeCount;
      return Promise.resolve(true);
    }),
  };
});
const { Default } = composeStories(stories);
test('check buttons', async () => {
  const { unmount } = render(<Default />);
  await act(() => Promise.resolve());
  expect(screen.getByTestId('current-badge-count').props.children).toEqual(0);
  const refreshBadgeCountButton = screen.getByTestId(
    'refresh-badge-count-button',
  );
  expect(refreshBadgeCountButton).toBeTruthy();
  await act(() => {
    fireEvent.press(refreshBadgeCountButton);
    return Promise.resolve();
  });
  expect(screen.getByTestId('current-badge-count').props.children).toEqual(0);
  await act(() => {
    fireEvent.press(screen.getByTestId('increment-badge-count-button'));
    return Promise.resolve();
  });
  expect(screen.getByTestId('current-badge-count').props.children).toEqual(1);
  await act(() => {
    fireEvent.press(screen.getByTestId('clear-badge-count-button'));
    return Promise.resolve();
  });
  expect(screen.getByTestId('current-badge-count').props.children).toEqual(0);
  unmount();
});
