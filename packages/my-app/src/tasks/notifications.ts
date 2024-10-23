import { notificationLog } from '@/logging';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async (taskBody) => {
  notificationLog.debug(taskBody);
});
