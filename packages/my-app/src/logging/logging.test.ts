// https://developer.mozilla.org/en-US/docs/Web/API/console#using_string_substitutions
// https://developer.mozilla.org/en-US/docs/Web/API/console/log_static
import './index';
import { consoleArgsToLoggerArgs } from './consoleArgsToLoggerArgs';

describe('logging with placeholders', () => {
  test('empty', () => {
    expect(consoleArgsToLoggerArgs()).toEqual([]);
  });
  test('scenarios', () => {
    expect(consoleArgsToLoggerArgs('foo %s', 'bar')).toEqual(['foo bar']);
    expect(consoleArgsToLoggerArgs('foo %o', 'bar')).toEqual(['foo "bar"']);
    expect(consoleArgsToLoggerArgs('foo %O', 'bar')).toEqual(['foo "bar"']);
    expect(consoleArgsToLoggerArgs('foo', 'bar')).toEqual(['foo', 'bar']);
    expect(consoleArgsToLoggerArgs({ foo: 'bar' })).toEqual([{ foo: 'bar' }]);
  });
  test('invalid placeholder', () => {
    expect(consoleArgsToLoggerArgs('foo %x', 'bar')).toEqual(['foo %x']);
  });
  test('undefined', () => {
    expect(consoleArgsToLoggerArgs(undefined)).toEqual(['undefined']);
  });
  test('null', () => {
    expect(consoleArgsToLoggerArgs(null)).toEqual(['null']);
  });
});

describe('Console log tests', () => {
  it('should log the correct message', () => {
    // Mock console.log
    const consoleLogMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    // Call your code that logs messages
    console.log('Hello, Lord Archimedes');

    // Assert that console.log was called with the correct message
    expect(consoleLogMock).toHaveBeenCalledWith('Hello, Lord Archimedes');

    // Restore the original console.log
    consoleLogMock.mockRestore();
  });

  it('should log the correct message with placeholders', () => {
    // Mock console.log
    const consoleLogMock = jest
      .spyOn(console, 'debug')
      .mockImplementation(() => {});

    // Call your code that logs messages
    console.debug('Hello, %s', 'Lord Archimedes');

    // Assert that console.log was called with the correct message
    expect(consoleLogMock).toHaveBeenCalledWith('Hello, %s', 'Lord Archimedes');

    // Restore the original console.log
    consoleLogMock.mockRestore();
  });
});
