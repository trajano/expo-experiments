import { act, renderHook } from '@testing-library/react-native';
import * as Notifications from 'expo-notifications';
import { useNotifications } from './useNotifications';

jest.mock('expo-notifications', () => {
  const actualNotifications = jest.requireActual('expo-notifications');
  return {
    ...actualNotifications,
    getExpoPushTokenAsync: jest.fn(),
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    setNotificationHandler: jest.fn(),
  };
});

jest.mock('expo-constants', () => {
  const actualConstants = jest.requireActual('expo-constants');
  return {
    ...actualConstants,
    executionEnvironment: 'standalone',
    easConfig: { projectId: 'test-project-id' },
    expoConfig: { extra: { eas: { projectId: 'test-extra-project-id' } } },
  };
});

jest.mock('expo-device', () => ({
  isDevice: true,
}));

describe('useNotifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ensures correct hook return values and proper re-renders with async operations', async () => {
    const getExpoPushTokenAsyncMock =
      Notifications.getExpoPushTokenAsync as jest.Mock;
    const getPermissionsAsyncMock =
      Notifications.getPermissionsAsync as jest.Mock;
    const requestPermissionsAsyncMock =
      Notifications.requestPermissionsAsync as jest.Mock;
    const setNotificationChannelAsyncMock =
      Notifications.setNotificationChannelAsync as jest.Mock;
    const setNotificationHandlerMock =
      Notifications.setNotificationHandler as jest.Mock;

    getExpoPushTokenAsyncMock.mockResolvedValue({ data: 'fake-token' });

    // Mock getPermissionsAsync to return not granted initially and granted thereafter
    getPermissionsAsyncMock
      .mockResolvedValueOnce({
        granted: false,
        canAskAgain: true,
        status: 'undetermined',
      })
      .mockResolvedValue({
        granted: true,
        canAskAgain: false,
        status: 'granted',
      });

    // Mock requestPermissionsAsync to return granted status
    requestPermissionsAsyncMock.mockResolvedValueOnce({
      granted: true,
      canAskAgain: false,
      status: 'granted',
    });

    setNotificationChannelAsyncMock.mockResolvedValue([]);

    // Use renderHook with a wrapper to track re-renders
    const { result } = renderHook(() => useNotifications());

    // Wait for all async operations to complete
    await act(() => Promise.resolve());
    await act(() => Promise.resolve());

    // Check the state after async operations
    expect(result.current.expoPushToken).toEqual({ data: 'fake-token' });
    expect(result.current.notificationPermissionsStatus).toEqual({
      granted: true,
      canAskAgain: false,
      status: 'granted',
    });
    expect(result.current.notificationChannels).toEqual([]);

    // Ensure requestPermissionsAsync is called only once
    expect(requestPermissionsAsyncMock).toHaveBeenCalledTimes(1);

    expect(setNotificationHandlerMock).toHaveBeenCalledTimes(1);
    const handleNotification =
      setNotificationHandlerMock.mock.calls[0][0].handleNotification;
    const expectedBehavior = {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
      priority: Notifications.AndroidNotificationPriority.DEFAULT,
    };
    const resultBehavior = await handleNotification();
    expect(resultBehavior).toEqual(expectedBehavior);
  });
});
