import { backgroundFetchLog } from '@/logging';
import * as BackgroundFetch from 'expo-background-fetch';
import { defineTrackingTask } from './defineTrackingTask';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_FETCH_TASK = 'background-fetch';

// Define the async taskBody as a constant arrow function
const handleBackgroundFetchTask = async (
  taskBody: TaskManager.TaskManagerTaskBody<Record<string, unknown>>,
): Promise<BackgroundFetch.BackgroundFetchResult> => {
  if (taskBody.error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }

  const result = Math.random();
  if (result > 0.5) {
    backgroundFetchLog.log(
      `Got background fetch call dice roll is ${result}, returning new data`,
    );
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } else {
    backgroundFetchLog.log(
      `Got background fetch call dice roll is ${result}, returning no data`,
    );
    return BackgroundFetch.BackgroundFetchResult.NoData;
  }
};

// Use the refactored constant in the defineTrackingTask function
defineTrackingTask<
  Record<string, unknown>,
  BackgroundFetch.BackgroundFetchResult
>(BACKGROUND_FETCH_TASK, backgroundFetchLog, handleBackgroundFetchTask);
