import { composeStories } from '@storybook/react';
import * as Notifications from 'expo-notifications';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as stories from './Badge.stories';

jest.mock('expo-notifications');
const { Default } = composeStories(stories);
test('check default', async () => {
  jest.mocked(Notifications.getBadgeCountAsync).mockResolvedValue(0);
  render(<Default />);
  await act(() => Promise.resolve());
  expect(screen.getByTestId('current-badge-count').props.children).toEqual(0);
  jest.mocked(Notifications.getBadgeCountAsync).mockResolvedValue(10);
  const refreshBadgeCountButton = screen.getByTestId(
    'refresh-badge-count-button',
  );
  expect(refreshBadgeCountButton).toBeTruthy();
  fireEvent.press(refreshBadgeCountButton);
  await act(() => Promise.resolve());
  expect(screen.getByTestId('current-badge-count').props.children).toEqual(10);
});
