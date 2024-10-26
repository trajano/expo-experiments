const stringValueOfAny = (o: any): string => {
  if (o === null) return 'null';
  if (o === undefined) return 'undefined';
  return o.toString();
};

const padNumber = (input: any, pad: number): string => {
  const parsed = parseInt(input, 10);
  return isNaN(parsed) ? 'NaN' : parsed.toString().padStart(pad, '0');
};

/**
 * Implements a subset of sprintf that is defined in
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/console#using_string_substitutions}.
 *
 * Supported formats: %s (string), %d or %i (integer), %f (float), %.xf (float with precision),
 * %.xd (padded integer), %o or %O (object).
 *
 * @param format The format string containing substitution tokens.
 * @param args The arguments to substitute in the format string.
 * @returns The formatted string with substitutions applied.
 */
export const sprintf = (format: string, ...args: any[]): string => {
  let index = 0;
  let argIndex = 0;
  let assembled = '';
  while (index < format.length) {
    const nextPercentIndex = format.indexOf('%', index);
    if (nextPercentIndex === -1) {
      return assembled + format.substring(index);
    } else {
      assembled += format.substring(index, nextPercentIndex);
      if (format.charAt(nextPercentIndex + 1) === 's') {
        assembled += stringValueOfAny(args[argIndex++]);
        index = nextPercentIndex + 2;
      } else if (
        format.charAt(nextPercentIndex + 1) === 'i' ||
        format.charAt(nextPercentIndex + 1) === 'd'
      ) {
        assembled += parseInt(args[argIndex++]);
        index = nextPercentIndex + 2;
      } else if (format.charAt(nextPercentIndex + 1) === 'f') {
        assembled += parseFloat(args[argIndex++]);
        index = nextPercentIndex + 2;
      } else if (format.charAt(nextPercentIndex + 1) === '.') {
        const nextF = format.indexOf('f', nextPercentIndex + 1);
        const nextD = format.indexOf('d', nextPercentIndex + 1);
        if (nextD === -1 && nextF === -1) {
          // at this point just plop the rest of the format string
          return assembled + format.substring(nextPercentIndex);
        } else if (nextF !== -1 && (nextF < nextD || nextD === -1)) {
          const parsedPrecision = parseInt(
            format.substring(nextPercentIndex + 2, nextF),
          );
          if (isNaN(parsedPrecision)) {
            return assembled + format.substring(nextPercentIndex);
          }
          assembled += parseFloat(args[argIndex++]).toFixed(parsedPrecision);
          index = nextPercentIndex + nextF - nextPercentIndex + 1;
        } else {
          const parsedPrecision = parseInt(
            format.substring(nextPercentIndex + 2, nextD),
          );
          if (isNaN(parsedPrecision)) {
            return assembled + format.substring(nextPercentIndex);
          }
          assembled += padNumber(args[argIndex++], parsedPrecision);
          index = nextPercentIndex + nextD - nextPercentIndex + 1;
        }
      } else if (
        format.charAt(nextPercentIndex + 1) === 'o' ||
        format.charAt(nextPercentIndex + 1) === 'O'
      ) {
        assembled += JSON.stringify(args[argIndex++]);
        index = nextPercentIndex + 2;
      } else {
        assembled += '%';
        index = nextPercentIndex + 1;
      }
    }
  }
  return assembled;
};
