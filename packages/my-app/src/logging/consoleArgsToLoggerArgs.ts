import { sprintf } from './sprintf';
export const consoleArgsToLoggerArgs = (...args: any[]): any[] => {
  if (args.length === 0) {
    return [];
  }
  if (typeof args[0] === 'string' && args[0].indexOf('%') !== -1) {
    const [format, ...subst] = args;
    return [sprintf(format, ...subst)];
  } else if (args[0] === undefined) {
    return ['undefined'];
  } else if (args[0] === null) {
    return ['null'];
  } else {
    return args;
  }
};
