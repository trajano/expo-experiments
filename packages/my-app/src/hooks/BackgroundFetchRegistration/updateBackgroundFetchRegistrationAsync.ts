import * as BackgroundFetch from 'expo-background-fetch';
import { BackgroundFetchTaskRegistration } from './BackgroundFetchRegistration.types';
import { BackgroundFetchOptions } from 'expo-background-fetch';

const registerBackgroundFetchAsync = async (
  backgroundFetchTaskName: string,
  backgroundFetchOptions: BackgroundFetchOptions,
) =>
  BackgroundFetch.registerTaskAsync(
    backgroundFetchTaskName,
    backgroundFetchOptions,
  );

export const updateBackgroundFetchRegistrationAsync = async (
  backgroundFetchTaskNames: string[],
  backgroundFetchRegistrations: BackgroundFetchTaskRegistration[],
  backgroundFetchOptions: BackgroundFetch.BackgroundFetchOptions,
) => {
  const backgroundTasksToUnregister = backgroundFetchRegistrations
    .map((it) => it.taskName)
    .filter(
      (knownTaskName) => !backgroundFetchTaskNames.includes(knownTaskName),
    );

  const registeredTaskNames = backgroundFetchRegistrations
    .filter((registration) => registration.registered)
    .map((registration) => registration.taskName);

  const backgroundTasksToRegister = backgroundFetchTaskNames.filter(
    (taskName) => !registeredTaskNames.includes(taskName),
  );

  for (const backgroundFetchTaskName of backgroundTasksToUnregister) {
    await BackgroundFetch.unregisterTaskAsync(backgroundFetchTaskName);
  }
  for (const backgroundFetchTaskName of backgroundTasksToRegister) {
    await registerBackgroundFetchAsync(
      backgroundFetchTaskName,
      backgroundFetchOptions,
    );
  }
};
