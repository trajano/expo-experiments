/**
 * Logging related.  This will install and override the default console logs with the exception of `console.debug`.  `console.debug` will be shown only on the development server console.
 */
import * as FileSystem from 'expo-file-system';
import { InteractionManager } from 'react-native';
import { fileAsyncTransport, logger } from 'react-native-logs';
import { consoleArgsToLoggerArgs } from './consoleArgsToLoggerArgs';

const consoleLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `logs_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const backgroundFetchLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `background_fetch_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const notificationLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `notification_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const locationLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `location_${new Date().toLocaleDateString()}.txt`,
  },
  asyncFunc: InteractionManager.runAfterInteractions,
});

// patch console logs
const originalConsoleLog = console.log;
console.log = (...args: any[]) => {
  originalConsoleLog(...args);
  consoleLog.log(...consoleArgsToLoggerArgs(...args));
};

const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  originalConsoleWarn(...args);
  consoleLog.warn(...consoleArgsToLoggerArgs(...args));
};

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  originalConsoleError(...args);
  consoleLog.error(...consoleArgsToLoggerArgs(...args));
};

const originalConsoleInfo = console.info;
console.info = (...args: any[]) => {
  originalConsoleInfo(...args);
  consoleLog.info(...consoleArgsToLoggerArgs(...args));
};
