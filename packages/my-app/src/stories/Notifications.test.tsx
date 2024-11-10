import { composeStories } from '@storybook/react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as stories from './Notification.stories';

jest.mock('@notifee/react-native', () => jest.fn());
const { Default } = composeStories(stories);
test('check default', async () => {
  render(<Default />);
  await act(() => Promise.resolve());
  const sendNotificationButton = screen.getByTestId('send-notification-button');
  expect(sendNotificationButton).toBeTruthy();
  fireEvent.press(sendNotificationButton);
});
