/**
 * Logging related.  This will install and override the default console logs.
 */
import {
  logger,
  consoleTransport,
  fileAsyncTransport,
} from 'react-native-logs';
import * as FileSystem from 'expo-file-system';
import { InteractionManager } from 'react-native';
let transport = [fileAsyncTransport];
if (__DEV__) {
  // create composite logger that logs both console and file
  transport.push(consoleTransport);
}

const log = logger.createLogger({
  transport,
  transportOptions: {
    FS: FileSystem,
    fileName: `logs_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const backgroundFetchLog = logger.createLogger({
  transport,
  transportOptions: {
    FS: FileSystem,
    fileName: `background_fetch_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const notificationLog = logger.createLogger({
  transport,
  transportOptions: {
    FS: FileSystem,
    fileName: `notification_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const locationLog = logger.createLogger({
  transport,
  transportOptions: {
    FS: FileSystem,
    fileName: `location_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

log.patchConsole();
console.debug({ message: 'log patched' });
