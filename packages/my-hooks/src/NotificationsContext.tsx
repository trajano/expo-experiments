import * as Device from 'expo-device';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import { Platform } from 'react-native';
export interface Notifications {
  expoPushToken?: ExpoPushToken;
  permissionStatus: PermissionStatus;
  /**
   * Explicitly request for permissions if needed.  This will render the request for the OS if needed.
   */
  ensurePermissionAsync(): Promise<void>;
}
const NotificationsContext = createContext<Notifications>({
  permissionStatus: PermissionStatus.UNDETERMINED,
  ensurePermissionAsync: () => Promise.resolve(),
});
export type NotificationsProviderProps = PropsWithChildren<{
  ensurePermissionsOnMount?: boolean;
  notificationBehavior?: NotificationBehavior;
  notificationPermissions?: NotificationPermissionsRequest;
  androidNotificationChannels?: Record<string, NotificationChannelInput>;
}>;
export const NotificationsProvider: FC<NotificationsProviderProps> = ({
  ensurePermissionsOnMount = true,
  notificationBehavior = {
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
    priority: AndroidNotificationPriority.DEFAULT,
  },
  notificationPermissions = {
    android: {},
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowCriticalAlerts: true,
      allowDisplayInCarPlay: true,
    },
  },
  androidNotificationChannels = {},
  children,
}) => {
  let easProjectId: string | undefined;
  if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
    easProjectId = Constants.easConfig?.projectId;
  } else {
    easProjectId = Constants.expoConfig?.extra?.eas.projectId;
  }

  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>();

  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );
  const [granted, setGranted] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(true);

  const ensurePermissionAsync = useCallback(async () => {
    if (!granted && canAskAgain) {
      const nextPermissions = await requestPermissionsAsync(
        notificationPermissions,
      );
      setGranted(nextPermissions.granted);
      setCanAskAgain(nextPermissions.canAskAgain);
      setPermissionStatus(nextPermissions.status);
    }
  }, [granted, canAskAgain, notificationPermissions]);

  useEffect(() => {
    (async () => {
      let nextExpoPushToken: ExpoPushToken;
      if (Device.isDevice && !!easProjectId) {
        nextExpoPushToken = await getExpoPushTokenAsync({
          projectId: easProjectId,
        });
        setExpoPushToken(nextExpoPushToken);
      }
    })();
  }, [easProjectId]);

  useEffect(() => {
    setNotificationHandler({
      handleNotification: () =>
        Promise.resolve({
          shouldPlaySound: notificationBehavior.shouldPlaySound,
          shouldSetBadge: notificationBehavior.shouldSetBadge,
          shouldShowAlert: notificationBehavior.shouldShowAlert,
          priority: notificationBehavior.priority,
        }),
    });
  }, [
    notificationBehavior.shouldPlaySound,
    notificationBehavior.shouldSetBadge,
    notificationBehavior.shouldShowAlert,
    notificationBehavior.priority,
  ]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await Promise.all(
          Object.entries(androidNotificationChannels).map(
            ([channelId, notificationChannelInput]) =>
              setNotificationChannelAsync(channelId, notificationChannelInput),
          ),
        );
      }
    })();
  }, [androidNotificationChannels]);

  useEffect(() => {
    (async () => {
      let currentPermissions = await getPermissionsAsync();
      setCanAskAgain(currentPermissions.canAskAgain);
      setGranted(currentPermissions.granted);
      setPermissionStatus(currentPermissions.status);
    })();
  }, [notificationPermissions, notificationBehavior]);

  useEffect(() => {
    if (!ensurePermissionsOnMount) {
      return;
    }
    (async () => {
      if (!granted && canAskAgain) {
        const nextPermissions = await requestPermissionsAsync(
          notificationPermissions,
        );
        setGranted(nextPermissions.granted);
        setCanAskAgain(nextPermissions.canAskAgain);
        setPermissionStatus(nextPermissions.status);
      }
    })();
  }, [ensurePermissionsOnMount, canAskAgain, granted, notificationPermissions]);

  const value = useMemo(
    () => ({
      expoPushToken,
      permissionStatus,
      ensurePermissionAsync,
    }),
    [expoPushToken, permissionStatus, ensurePermissionAsync],
  );
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
export const useNotifications = () => useContext(NotificationsContext);
