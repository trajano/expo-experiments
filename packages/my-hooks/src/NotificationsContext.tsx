import Constants, { ExecutionEnvironment } from 'expo-constants';
import { PermissionStatus } from 'expo-modules-core';
import {
  AndroidNotificationPriority,
  ExpoPushToken,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  NotificationBehavior,
  NotificationChannelInput,
  NotificationPermissionsRequest,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';

/**
 * Interface representing the notifications context value.
 */
export interface Notifications {
  /**
   * The Expo push token associated with the current device and user.
   */
  expoPushToken?: ExpoPushToken;
  /**
   * Error received when obtaining the push token.
   */
  expoPushTokenError?: Error;

  /**
   * The current permission status for notifications.
   */
  permissionStatus: PermissionStatus;

  /**
   * Explicitly requests for permissions if needed.
   * This will render the permission request prompt from the OS if applicable.
   */
  ensurePermissionAsync(): Promise<void>;
}

/**
 * React context for managing notifications state and behavior.
 */
const NotificationsContext = createContext<Notifications>({
  permissionStatus: PermissionStatus.UNDETERMINED,
  ensurePermissionAsync: () => Promise.resolve(),
});

/**
 * Props for the `NotificationsProvider` component.
 */
export type NotificationsProviderProps = PropsWithChildren<{
  /**
   * Determines whether permissions should be checked and requested on component mount.
   * Defaults to `true`.
   */
  ensurePermissionsOnMount?: boolean;

  /**
   * Custom notification behavior that dictates how notifications are handled.
   */
  notificationBehavior?: NotificationBehavior;

  /**
   * Custom notification permissions request options.
   */
  notificationPermissions?: NotificationPermissionsRequest;

  /**
   * Custom configuration for Android notification channels.
   */
  androidNotificationChannels?: Record<string, NotificationChannelInput>;
}>;

/**
 * `NotificationsProvider` is a context provider component that sets up and manages
 * notifications behavior, permissions, and state for its child components.
 * It provides the current notification token and permission status via the context.
 *
 * @param props - Props for configuring the notifications behavior and permissions.
 * @returns A context provider wrapping its children.
 */
export const NotificationsProvider: FC<NotificationsProviderProps> = ({
  ensurePermissionsOnMount = true,
  notificationBehavior,
  notificationPermissions,
  androidNotificationChannels,
  children,
}) => {
  let easProjectId: string | undefined;

  // Determine the EAS project ID based on the execution environment.
  if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
    easProjectId = Constants.easConfig?.projectId;
  } else {
    easProjectId = Constants.expoConfig?.extra?.eas.projectId;
  }

  // Memoized default notification behavior.
  const memoizedNotificationBehavior = useMemo(
    () =>
      notificationBehavior ?? {
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true,
        priority: AndroidNotificationPriority.DEFAULT,
      },
    [notificationBehavior],
  );

  // Memoized notification permissions.
  const memoizedNotificationPermissions = useMemo(
    () =>
      notificationPermissions ?? {
        android: {},
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowCriticalAlerts: true,
          allowDisplayInCarPlay: true,
        },
      },
    [notificationPermissions],
  );

  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>();
  const [expoPushTokenError, setExpoPushTokenError] = useState<Error>();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );
  const [granted, setGranted] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(true);

  /**
   * Ensures that notification permissions are requested if they haven't been granted.
   */
  const ensurePermissionAsync = useCallback(async () => {
    if (!granted && canAskAgain) {
      const nextPermissions = await requestPermissionsAsync(
        memoizedNotificationPermissions,
      );
      setGranted(nextPermissions.granted);
      setCanAskAgain(nextPermissions.canAskAgain);
      setPermissionStatus(nextPermissions.status);
    }
  }, [granted, canAskAgain, memoizedNotificationPermissions]);

  // Effect to get the Expo push token when the component mounts.
  useEffect(() => {
    (async () => {
      let nextExpoPushToken: ExpoPushToken;
      try {
        nextExpoPushToken = await getExpoPushTokenAsync({
          projectId: easProjectId,
        });
        setExpoPushToken(nextExpoPushToken);
      } catch (e: unknown) {
        setExpoPushTokenError(e as Error);
      }
    })();
  }, [easProjectId]);

  // Effect to set notification handler based on the provided behavior.
  useEffect(() => {
    setNotificationHandler({
      handleNotification: () => Promise.resolve(memoizedNotificationBehavior),
    });
  }, [memoizedNotificationBehavior]);

  // Effect to set up Android notification channels.
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && androidNotificationChannels) {
        await Promise.all(
          Object.entries(androidNotificationChannels).map(
            ([channelId, notificationChannelInput]) =>
              setNotificationChannelAsync(channelId, notificationChannelInput),
          ),
        );
      }
    })();
  }, [androidNotificationChannels]);

  // Effect to check and request permissions on mount if needed.
  useEffect(() => {
    (async () => {
      let currentPermissions = await getPermissionsAsync();

      if (ensurePermissionsOnMount) {
        if (!currentPermissions.granted && currentPermissions.canAskAgain) {
          currentPermissions = await requestPermissionsAsync(
            memoizedNotificationPermissions,
          );
        }
      }

      setCanAskAgain(currentPermissions.canAskAgain);
      setGranted(currentPermissions.granted);
      setPermissionStatus(currentPermissions.status);
    })();
  }, [
    memoizedNotificationPermissions,
    notificationBehavior,
    ensurePermissionsOnMount,
  ]);

  // Memoize the context value to avoid unnecessary re-renders.
  const value = useMemo(
    () => ({
      expoPushToken,
      permissionStatus,
      ensurePermissionAsync,
      expoPushTokenError,
    }),
    [
      expoPushToken,
      permissionStatus,
      expoPushTokenError,
      ensurePermissionAsync,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

/**
 * Hook to access the notifications context.
 * Provides the current push token, permission status, and a method to request permissions.
 *
 * @returns The notifications context value.
 */
export const useNotifications = () => useContext(NotificationsContext);

export const WithNotifications = <P extends object>(
  Component: ComponentType<P>,
): FC<P & NotificationsProviderProps> => {
  const WrappedComponent = ({
    ensurePermissionsOnMount,
    notificationBehavior,
    notificationPermissions,
    androidNotificationChannels,
    ...props
  }: P & NotificationsProviderProps) => (
    <NotificationsProvider
      ensurePermissionsOnMount={ensurePermissionsOnMount}
      notificationBehavior={notificationBehavior}
      notificationPermissions={notificationPermissions}
      androidNotificationChannels={androidNotificationChannels}
    >
      <Component {...(props as P)} />
    </NotificationsProvider>
  );
  WrappedComponent.displayName = `WithNotifications(${Component.displayName || Component.name || 'Component'}`;
  return WrappedComponent;
};
