import { TaskManagerTaskBody } from 'expo-task-manager';

type FirebaseCloudMessagingPushNotificationTaskBodyData = {
  notification: {
    data: {
      message: string;
      title: string;
      /**
       * The data that was sent is placed here as a JSON string.
       */
      body: string;
      scopeKey: string;
      projectId: string;
      experienceId: string;
    };
  };
};

/**
 * This extracts the data from a background notification.  This one is specifically for Android and there's a corresponding one for iOS.
 * */
export const extractDataFromBackgroundNotification = <
  R extends Record<string, unknown>,
>(
  taskBody: TaskManagerTaskBody,
): R => {
  return JSON.parse(
    (taskBody.data as FirebaseCloudMessagingPushNotificationTaskBodyData)
      .notification.data.body,
  ) as R;
};
