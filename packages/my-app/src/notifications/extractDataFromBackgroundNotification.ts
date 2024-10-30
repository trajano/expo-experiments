import { TaskManagerTaskBody } from 'expo-task-manager';

type ApplePushNotificationTaskBodyData = {
  aps: Record<string, unknown>;
  /**
   * The data that got sent in the push notification `data` element is placed here.
   */
  body: Record<string, unknown>;
  scopeKey: string;
  projectId: string;
  experienceId: string;
};

/**
 * This extracts the data from a background notification.  This one is specifically for iOS and there's a corresponding one for Android.
 */
export const extractDataFromBackgroundNotification = <
  R extends Record<string, unknown>,
>(
  taskBody: TaskManagerTaskBody,
): R => {
  return (taskBody.data as ApplePushNotificationTaskBodyData).body as R;
};
