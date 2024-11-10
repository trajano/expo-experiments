import { composeStories } from '@storybook/react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as stories from './Notification.stories';

jest.mock('expo-constants', () => ({
  ...jest.requireActual('expo-constants'),
  systemFonts: ['Arial', 'another font'],
}));
jest.mock('@notifee/react-native', () => jest.fn());
const { Default } = composeStories(stories);
test('check default', async () => {
  render(<Default />);
  await act(() => Promise.resolve());
  let sendNotificationButton = screen.getByTestId('send-notification-button');
  expect(sendNotificationButton).toBeTruthy();
  fireEvent.press(sendNotificationButton);
});
