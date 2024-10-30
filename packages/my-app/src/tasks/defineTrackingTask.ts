import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager';
import type { logger } from 'react-native-logs';

export const defineTrackingTask = <T = unknown, Y = unknown>(
  taskName: string,
  taskLogger: ReturnType<(typeof logger)['createLogger']>,
  wrappedExecutor?: (
    taskBody: TaskManager.TaskManagerTaskBody<T>,
  ) => Promise<Y>,
) => {
  const counterItemName = `${taskName}-count`;
  const trackingItemName = `${taskName}-tracking`;
  TaskManager.defineTask<T>(taskName, async (taskBody) => {
    try {
      const currentCount = parseInt(
        (await AsyncStorage.getItem(counterItemName)) ?? '0',
      );
      const currentTracking = JSON.parse(
        (await AsyncStorage.getItem(trackingItemName)) ?? '[]',
      ) as [string, object];
      currentTracking.unshift([new Date().toISOString(), taskBody.data]);
      await AsyncStorage.setItem(
        counterItemName,
        (currentCount + 1).toString(),
      );
      await AsyncStorage.setItem(
        trackingItemName,
        JSON.stringify(currentTracking, null, 2),
      );
      taskLogger.debug(taskBody);
      if (wrappedExecutor) {
        return wrappedExecutor(taskBody);
      }
    } catch (error: unknown) {
      taskLogger.error(`failed on task ${error}`);
      if (wrappedExecutor) {
        return wrappedExecutor({
          ...taskBody,
          error: {
            code: 'defineTrackingTaskError',
            message: `failed on task ${error}`,
          },
        });
      }
    }
  });
};
