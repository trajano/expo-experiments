import { locationLog } from '@/logging';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async (taskBody) => {
  locationLog.debug(taskBody);
});
