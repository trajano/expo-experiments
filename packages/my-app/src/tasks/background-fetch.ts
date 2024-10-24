import { backgroundFetchLog } from '@/logging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async (taskBody) => {
  const currentBackgroundFetchCount = parseInt(
    (await AsyncStorage.getItem('background-fetch-count')) ?? '0',
  );
  await AsyncStorage.setItem(
    'background-fetch-count',
    (currentBackgroundFetchCount + 1).toString(),
  );
  backgroundFetchLog.debug(taskBody);
  const result = Math.random();
  if (result > 0.55) {
    backgroundFetchLog.log(
      `Got background fetch call dice roll is ${result}, returning new data`,
    );
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } else if (result > 0.1) {
    backgroundFetchLog.log(
      `Got background fetch call dice roll is ${result}, returning no data`,
    );
    return BackgroundFetch.BackgroundFetchResult.NoData;
  } else {
    backgroundFetchLog.error(
      `Got background fetch call dice roll is ${result}, returning failed`,
    );
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
