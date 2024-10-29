/* eslint-disable @typescript-eslint/no-unused-vars  */
import * as TaskManager from 'expo-task-manager';
import { logger } from 'react-native-logs';
import { defineTrackingTask } from './defineTrackingTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-task-manager', () => ({
  ...jest.requireActual('expo-task-manager'),
  defineTask: jest.fn(),
}));

describe('defineTrackingTask', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });
  it('should correctly define a task and update AsyncStorage', async () => {
    const taskLogger = jest.mocked(
      logger.createLogger({ transport: jest.fn() }),
    );
    defineTrackingTask('myTask', taskLogger);
    expect(TaskManager.defineTask).toHaveBeenCalled();
    const theFunction = jest.mocked(TaskManager.defineTask).mock
      .lastCall![1] as (data: any) => Promise<any>;
    expect(theFunction).toBeTruthy();
    const result = await theFunction({
      data: {},
      error: null,
      executionInfo: { taskName: 'myTask', eventId: 'eventId' },
    });
    expect(result).toBeUndefined();
    const count = await AsyncStorage.getItem('myTask-count');
    expect(count).toBe('1');
    const tracking = await AsyncStorage.getItem('myTask-tracking');
    expect(Array.isArray(JSON.parse(tracking!))).toBeTruthy();
  });

  it('should correctly define a task and update AsyncStorage with executor', async () => {
    const taskLogger = jest.mocked(
      logger.createLogger({ transport: jest.fn() }),
    );
    const executor = jest.fn((_: TaskManager.TaskManagerTaskBody) =>
      Promise.resolve(true),
    );
    defineTrackingTask('myTask', taskLogger, executor);
    const theFunction = jest.mocked(TaskManager.defineTask).mock
      .lastCall![1] as (data: any) => Promise<any>;
    const result = await theFunction({
      data: {},
      error: null,
      executionInfo: { taskName: 'myTask', eventId: 'eventId' },
    });
    expect(executor).toHaveBeenCalled();
    expect(result).toEqual(true);
    const count = await AsyncStorage.getItem('myTask-count');
    expect(count).toBe('1');
    const tracking = await AsyncStorage.getItem('myTask-tracking');
    expect(Array.isArray(JSON.parse(tracking!))).toBeTruthy();
  });

  it('should handle errors', async () => {
    const taskLogger = jest.mocked(
      logger.createLogger({ transport: jest.fn() }),
    );
    defineTrackingTask('myTask', taskLogger);
    const theFunction = jest.mocked(TaskManager.defineTask).mock
      .lastCall![1] as (data: any) => Promise<any>;
    expect(theFunction).toBeTruthy();
    const result = await theFunction({
      data: {},
      error: { code: 42, message: 'foo' },
      executionInfo: { taskName: 'myTask', eventId: 'eventId' },
    });
    expect(result).toBeUndefined();
  });
});
