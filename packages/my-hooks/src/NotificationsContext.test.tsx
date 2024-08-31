import { act, fireEvent, render } from '@testing-library/react-native';
import * as Notifications from 'expo-notifications';
import { PermissionStatus } from 'expo-modules-core';
import { Button, Text } from 'react-native';
import {
  NotificationsProvider,
  useNotifications,
} from './NotificationsContext';

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
const getExpoPushTokenAsyncMock = jest.mocked(
  Notifications.getExpoPushTokenAsync,
);
const getPermissionsAsyncMock = jest.mocked(Notifications.getPermissionsAsync);
const requestPermissionsAsyncMock = jest.mocked(
  Notifications.requestPermissionsAsync,
);
const setNotificationHandlerMock = jest.mocked(
  Notifications.setNotificationHandler,
);

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

const TestComponent: React.FC = () => {
  const { expoPushToken, permissionStatus, ensurePermissionAsync } =
    useNotifications();

  return (
    <>
      <Text testID="expoPushToken">{expoPushToken?.data || 'No token'}</Text>
      <Text testID="permissionStatus">{permissionStatus}</Text>
      <Button
        testID="ensurePermissionButton"
        title="Ensure Permission"
        onPress={ensurePermissionAsync}
      />
    </>
  );
};

describe('NotificationsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides the correct initial context values', async () => {
    // Mock getPermissionsAsync to return not granted initially and granted thereafter
    getPermissionsAsyncMock
      .mockResolvedValueOnce({
        granted: false,
        canAskAgain: true,
        status: PermissionStatus.UNDETERMINED,
        expires: 'never',
      })
      .mockResolvedValue({
        granted: true,
        canAskAgain: false,
        status: PermissionStatus.GRANTED,
        expires: 'never',
      });

    // Mock requestPermissionsAsync to return granted status
    requestPermissionsAsyncMock.mockResolvedValueOnce({
      granted: true,
      canAskAgain: false,
      status: PermissionStatus.GRANTED,
      expires: 'never',
    });

    const { getByTestId, toJSON } = render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('expoPushToken').props.children).toBe('No token');
    expect(getByTestId('permissionStatus').props.children).toBe('granted');
    expect(toJSON()).toMatchSnapshot();
  });

  it('provides the correct initial context values without ensuring on mount', async () => {
    // Mock getPermissionsAsync to return not granted initially and granted thereafter
    getPermissionsAsyncMock.mockResolvedValueOnce({
      granted: false,
      canAskAgain: true,
      status: PermissionStatus.UNDETERMINED,
      expires: 'never',
    });

    const { getByTestId, toJSON } = render(
      <NotificationsProvider ensurePermissionsOnMount={false}>
        <TestComponent />
      </NotificationsProvider>,
    );
    await act(() => Promise.resolve());
    expect(getByTestId('expoPushToken').props.children).toBe('No token');
    expect(getByTestId('permissionStatus').props.children).toBe('undetermined');
    expect(toJSON()).toMatchSnapshot();
    expect(requestPermissionsAsyncMock).not.toHaveBeenCalled();
  });

  it('fetches and updates expo push token on mount', async () => {
    getExpoPushTokenAsyncMock.mockResolvedValue({
      type: 'expo',
      data: 'fake-token',
    });

    // Mock getPermissionsAsync to return not granted initially and granted thereafter
    getPermissionsAsyncMock
      .mockResolvedValueOnce({
        granted: false,
        canAskAgain: true,
        status: PermissionStatus.UNDETERMINED,
        expires: 'never',
      })
      .mockResolvedValue({
        granted: true,
        canAskAgain: false,
        status: PermissionStatus.GRANTED,
        expires: 'never',
      });

    // Mock requestPermissionsAsync to return granted status
    requestPermissionsAsyncMock.mockResolvedValue({
      granted: true,
      canAskAgain: false,
      status: PermissionStatus.GRANTED,
      expires: 'never',
    });

    const { getByTestId } = render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>,
    );

    await act(() => Promise.resolve());
    expect(getByTestId('expoPushToken').props.children).toBe('fake-token');
    expect(requestPermissionsAsyncMock).toHaveBeenCalledTimes(1);
  });

  it('calls ensurePermissionAsync and updates permission status', async () => {
    // Mock getPermissionsAsync to return not granted initially and granted thereafter
    getPermissionsAsyncMock
      .mockResolvedValueOnce({
        granted: false,
        canAskAgain: true,
        status: PermissionStatus.UNDETERMINED,
        expires: 'never',
      })
      .mockResolvedValue({
        granted: true,
        canAskAgain: false,
        status: PermissionStatus.GRANTED,
        expires: 'never',
      });

    requestPermissionsAsyncMock.mockResolvedValue({
      granted: true,
      canAskAgain: false,
      status: PermissionStatus.GRANTED,
      expires: 'never',
    });

    const { getByTestId } = render(
      <NotificationsProvider ensurePermissionsOnMount={false}>
        <TestComponent />
      </NotificationsProvider>,
    );

    expect(requestPermissionsAsyncMock).not.toHaveBeenCalled();
    fireEvent.press(getByTestId('ensurePermissionButton'));
    await act(() => Promise.resolve());
    expect(requestPermissionsAsyncMock).toHaveBeenCalledTimes(1);

    expect(getByTestId('permissionStatus').props.children).toBe('granted');
  });

  it('sets notification handler with provided notification behavior', async () => {
    render(
      <NotificationsProvider
        notificationBehavior={{
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowAlert: false,
          priority: Notifications.AndroidNotificationPriority.LOW,
        }}
      >
        <TestComponent />
      </NotificationsProvider>,
    );

    await act(() => Promise.resolve());
    expect(setNotificationHandlerMock).toHaveBeenCalledTimes(1);

    const handleNotification =
      setNotificationHandlerMock.mock.calls[0][0].handleNotification;
    const expectedBehavior = {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: false,
      priority: Notifications.AndroidNotificationPriority.LOW,
    };

    const resultBehavior = await handleNotification(
      {} as Notifications.Notification,
    );
    expect(resultBehavior).toEqual(expectedBehavior);
  });

  it('sets token and permission status directly when permissions are already granted', async () => {
    // Mock getPermissionsAsync to return granted initially
    getPermissionsAsyncMock.mockResolvedValue({
      granted: true,
      canAskAgain: false,
      status: PermissionStatus.GRANTED,
      expires: 'never',
    });

    // Mock getExpoPushTokenAsync to return a token
    getExpoPushTokenAsyncMock.mockResolvedValue({
      type: 'expo',
      data: 'fake-token',
    });

    const { getByTestId } = render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>,
    );

    await act(() => Promise.resolve());
    expect(getByTestId('expoPushToken').props.children).toBe('fake-token');
    expect(getByTestId('permissionStatus').props.children).toBe(
      PermissionStatus.GRANTED,
    );

    // Ensure requestPermissionsAsync is never called since permission is already granted
    expect(requestPermissionsAsyncMock).not.toHaveBeenCalled();
    fireEvent.press(getByTestId('ensurePermissionButton'));
    await act(() => Promise.resolve());
    expect(requestPermissionsAsyncMock).not.toHaveBeenCalled();
  });
});
