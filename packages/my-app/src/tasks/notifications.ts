import { notificationLog } from '@/logging';
import { defineTrackingTask } from './defineTrackingTask';
import { extractDataFromBackgroundNotification } from '@/notifications';

export const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';

defineTrackingTask(
  BACKGROUND_NOTIFICATION_TASK,
  notificationLog,
  async (taskBody) => {
    notificationLog.info(extractDataFromBackgroundNotification(taskBody));
  },
);
