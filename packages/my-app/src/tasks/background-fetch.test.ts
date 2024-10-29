import * as TaskManager from 'expo-task-manager';
import { BACKGROUND_FETCH_TASK } from './background-fetch';
import { BackgroundFetchResult } from 'expo-background-fetch';

jest.mock('expo-task-manager', () => ({
  ...jest.requireActual('expo-task-manager'),
  defineTask: jest.fn(),
}));
jest.mock('@/logging', () => ({
  backgroundFetchLog: {
    log: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('background-fetch', () => {
  it('should load and execute', async () => {
    expect(TaskManager.defineTask).toHaveBeenCalledWith(
      BACKGROUND_FETCH_TASK,
      expect.anything(),
    );
    const theFunction = jest.mocked(TaskManager.defineTask).mock
      .lastCall![1] as (data: any) => Promise<BackgroundFetchResult>;

    const result = await theFunction({
      data: {},
      error: null,
      executionInfo: { taskName: 'myTask', eventId: 'eventId' },
    });
    expect(
      result === BackgroundFetchResult.NewData ||
        result === BackgroundFetchResult.NoData,
    ).toBeTruthy();
    expect(result === BackgroundFetchResult.Failed).toBeFalsy();
  });

  it('should handle error', async () => {
    expect(TaskManager.defineTask).toHaveBeenCalledWith(
      BACKGROUND_FETCH_TASK,
      expect.anything(),
    );
    const theFunction = jest.mocked(TaskManager.defineTask).mock
      .lastCall![1] as (data: any) => Promise<BackgroundFetchResult>;

    const result = await theFunction({
      data: {},
      error: { code: 1, message: 'foo' },
      executionInfo: { taskName: 'myTask', eventId: 'eventId' },
    });
    expect(result).toEqual(BackgroundFetchResult.Failed);
  });
});
