const stringValueOfAny = (o: any): string => {
  if (o === null) return 'null';
  if (o === undefined) return 'undefined';
  return o.toString();
};

const padNumber = (input: any, pad: number): string => {
  const parsed = parseInt(input, 10);
  return isNaN(parsed) ? 'NaN' : parsed.toString().padStart(pad, '0');
};

const formatFloat = (arg: any, precision?: number) =>
  precision !== undefined
    ? parseFloat(arg).toFixed(precision)
    : parseFloat(arg).toString();

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
    }

    // Add non-format part
    assembled += format.substring(index, nextPercentIndex);
    const nextChar = format.charAt(nextPercentIndex + 1);

    switch (nextChar) {
      case 's':
        assembled += stringValueOfAny(args[argIndex++]);
        index = nextPercentIndex + 2;
        break;

      case 'd':
      case 'i':
        assembled += parseInt(args[argIndex++]);
        index = nextPercentIndex + 2;
        break;

      case 'f':
        assembled += formatFloat(args[argIndex++]);
        index = nextPercentIndex + 2;
        break;

      case '.': {
        const precisionMatch = /^(\d+)[fd]/.exec(
          format.slice(nextPercentIndex + 2),
        );
        if (!precisionMatch)
          return assembled + format.substring(nextPercentIndex);

        const precision = parseInt(precisionMatch[1], 10);
        const typeChar =
          format[nextPercentIndex + 2 + precisionMatch[1].length];

        if (typeChar === 'f') {
          assembled += formatFloat(args[argIndex++], precision);
        } else if (typeChar === 'd') {
          assembled += padNumber(args[argIndex++], precision);
        }
        index = nextPercentIndex + 3 + precisionMatch[1].length;
        break;
      }

      case 'o':
      case 'O':
        assembled += JSON.stringify(args[argIndex++]);
        index = nextPercentIndex + 2;
        break;

      default:
        assembled += '%';
        index = nextPercentIndex + 1;
    }
  }

  return assembled;
};
