import { updateBackgroundFetchRegistrationAsync } from './updateBackgroundFetchRegistrationAsync';
import * as BackgroundFetch from 'expo-background-fetch';

jest.mock('expo-background-fetch');
test('no background tasks', async () => {
  await updateBackgroundFetchRegistrationAsync([], [], {});
  expect(BackgroundFetch.registerTaskAsync).not.toHaveBeenCalled();
  expect(BackgroundFetch.unregisterTaskAsync).not.toHaveBeenCalled();
});

test('unregister single task', async () => {
  await updateBackgroundFetchRegistrationAsync(
    [],
    [{ taskName: 'foo', registered: true }],
    {},
  );
  expect(BackgroundFetch.registerTaskAsync).not.toHaveBeenCalled();
  expect(BackgroundFetch.unregisterTaskAsync).toHaveBeenCalledWith('foo');
});

test('register single task', async () => {
  await updateBackgroundFetchRegistrationAsync(['foo'], [], {
    minimumInterval: 511,
  });
  expect(BackgroundFetch.registerTaskAsync).toHaveBeenCalledWith('foo', {
    minimumInterval: 511,
  });
  expect(BackgroundFetch.unregisterTaskAsync).not.toHaveBeenCalled();
});

test('do not register', async () => {
  await updateBackgroundFetchRegistrationAsync(
    ['foo'],
    [{ taskName: 'foo', registered: true }],
    {},
  );
  expect(BackgroundFetch.registerTaskAsync).not.toHaveBeenCalled();
  expect(BackgroundFetch.unregisterTaskAsync).not.toHaveBeenCalled();
});

test('register multiple and unregister', async () => {
  await updateBackgroundFetchRegistrationAsync(
    ['bar', 'baz'],
    [{ taskName: 'foo', registered: true }],
    {},
  );
  expect(BackgroundFetch.registerTaskAsync).toHaveBeenCalledWith('bar', {});
  expect(BackgroundFetch.registerTaskAsync).toHaveBeenCalledWith('baz', {});
  expect(BackgroundFetch.unregisterTaskAsync).toHaveBeenCalledWith('foo');
});

afterEach(() => {
  jest.resetAllMocks();
});
