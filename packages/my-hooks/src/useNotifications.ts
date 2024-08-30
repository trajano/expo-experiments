import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Device from 'expo-device';
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export type UseNotificationsOptions = {
  notificationBehavior?: Notifications.NotificationBehavior;
  notificationPermissions?: Notifications.NotificationPermissionsRequest;
  androidNotificationChannels?: Record<
    string,
    Notifications.NotificationChannelInput
  >;
};

export type UseNotificationsResult = {
  expoPushToken: Notifications.ExpoPushToken;
  easProjectId: string;
  permissionStatus: PermissionStatus;
  notificationPermissionsStatus: Notifications.NotificationPermissionsStatus;
  notificationChannels: Notifications.NotificationChannel[];
};

/**
 * This assumes that no other parts of the code is doing notifications as this relies on useEffect to set the Notification
 * environment up so that the module is still free of side effects.
 */
export const useNotifications = ({
  notificationBehavior = {
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
    priority: Notifications.AndroidNotificationPriority.DEFAULT,
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
}: UseNotificationsOptions): UseNotificationsResult => {
  let easProjectId: string;
  if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
    easProjectId = Constants.easConfig.projectId;
  } else {
    easProjectId = Constants.expoConfig.extra.eas.projectId;
  }

  const notificationPermissionsStatusRef =
    useRef<Notifications.NotificationPermissionsStatus>();
  const notificationChannelsRef = useRef<Notifications.NotificationChannel[]>(
    [],
  );

  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken>();

  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );

  useEffect(() => {
    (async () => {
      let nextExpoPushToken: Notifications.ExpoPushToken;
      if (Device.isDevice) {
        nextExpoPushToken = await Notifications.getExpoPushTokenAsync({
          projectId: easProjectId,
        });
        setExpoPushToken(nextExpoPushToken);
      }
    })();
  }, [easProjectId]);
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        notificationChannelsRef.current = await Promise.all(
          Object.entries(androidNotificationChannels).map(
            ([channelId, notificationChannelInput]) =>
              Notifications.setNotificationChannelAsync(
                channelId,
                notificationChannelInput,
              ),
          ),
        );
      }

      Notifications.setNotificationHandler({
        handleNotification: () => Promise.resolve(notificationBehavior),
      });

      notificationPermissionsStatusRef.current =
        await Notifications.getPermissionsAsync();
      if (
        !notificationPermissionsStatusRef.current.granted &&
        notificationPermissionsStatusRef.current.canAskAgain
      ) {
        notificationPermissionsStatusRef.current =
          await Notifications.requestPermissionsAsync(notificationPermissions);
      }

      setPermissionStatus(notificationPermissionsStatusRef.current.status);
    })();
  }, [
    androidNotificationChannels,
    notificationPermissions,
    notificationBehavior,
  ]);
  return {
    expoPushToken,
    easProjectId,
    notificationPermissionsStatus: notificationPermissionsStatusRef.current,
    notificationChannels: notificationChannelsRef.current,
    permissionStatus,
  };
};
