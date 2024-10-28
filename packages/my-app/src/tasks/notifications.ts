import { notificationLog } from '@/logging';
import { defineTrackingTask } from './defineTrackingTask';

export const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';

defineTrackingTask(BACKGROUND_NOTIFICATION_TASK, notificationLog);
