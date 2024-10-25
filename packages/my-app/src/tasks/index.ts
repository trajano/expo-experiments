/**
 * Registers task manager tasks
 */
import * as TaskManager from 'expo-task-manager';
import { BACKGROUND_FETCH_TASK } from './background-fetch';
import { BACKGROUND_LOCATION_TASK } from './location';
import { BACKGROUND_NOTIFICATION_TASK } from './notifications';
export { BACKGROUND_FETCH_TASK } from './background-fetch';
export { BACKGROUND_LOCATION_TASK } from './location';
export { BACKGROUND_NOTIFICATION_TASK } from './notifications';
console.debug({
  BACKGROUND_FETCH_TASK: TaskManager.isTaskDefined(BACKGROUND_FETCH_TASK),
  BACKGROUND_NOTIFICATION_TASK: TaskManager.isTaskDefined(
    BACKGROUND_NOTIFICATION_TASK,
  ),
  BACKGROUND_LOCATION_TASK: TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK),
});
