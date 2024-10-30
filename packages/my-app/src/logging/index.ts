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

/**
 * Background fetch logs.  This does not explicitly use the asyncFunc: InteractionManager.runAfterInteractions and
 * sets async to false.
 */
export const backgroundFetchLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `background_fetch_${new Date().toLocaleDateString()}.txt`,
  },
  async: false,
});

export const notificationLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `notification_${new Date().toLocaleDateString()}.txt`,
  },
  async: false,
});

export const locationLog = logger.createLogger({
  transport: fileAsyncTransport,
  transportOptions: {
    FS: FileSystem,
    fileName: `location_${new Date().toLocaleDateString()}.txt`,
  },
  async: false,
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

const clearLogFilesByPrefixAndSuffixAsync = async (
  prefix: string,
  suffix: string,
): Promise<void> => {
  await Promise.all(
    (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory!))
      .filter((it) => it.startsWith(prefix) && it.endsWith(suffix))
      .map((it) => FileSystem.documentDirectory + it)
      .map((it) => FileSystem.deleteAsync(it, { idempotent: true })),
  );
};
export const clearLogFilesAsync = async (): Promise<void> => {
  await Promise.all([
    clearLogFilesByPrefixAndSuffixAsync('logs_', '.txt'),
    clearLogFilesByPrefixAndSuffixAsync('background_fetch_', '.txt'),
    clearLogFilesByPrefixAndSuffixAsync('notification_', '.txt'),
    clearLogFilesByPrefixAndSuffixAsync('location_', '.txt'),
  ]);
};
