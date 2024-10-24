const sprintf = (format: string, ...args: any[]): string => {
  let i = 0;
  return format.replace(/%([sdif]|%\.\d+f|o|O)/g, (match: string): string => {
    if (i >= args.length) return match;

    switch (match) {
      case '%s':
        return String(args[i++]);
      case '%d':
      case '%i':
        return parseInt(args[i++], 10).toString();
      case '%f':
        return parseFloat(args[i++]).toString();
      case '%o':
      case '%O':
        return JSON.stringify(args[i++]);
      default: {
        const floatMatch = /^%\.(\d+)f$/.exec(match);
        if (floatMatch) {
          const precision = parseInt(floatMatch[1], 10);
          return parseFloat(args[i++]).toFixed(precision);
        }
        return match;
      }
    }
  });
};
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
