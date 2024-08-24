import { act, renderHook } from '@testing-library/react-native';
import { useClockState } from './useClockState';

describe('Clock update using hook', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should work when starting at zero seconds', async () => {
    const now = new Date('2020-01-01T00:00:00Z');
    jest.useFakeTimers().setSystemTime(now);

    const { result, unmount } = renderHook(() => useClockState());
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:00.000Z'));

    jest.advanceTimersByTime(500);
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:00.000Z'));

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:01.000Z'));

    jest.advanceTimersByTime(500);
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:01.000Z'));

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:02.000Z'));

    unmount();
  });

  it('should work when starting at non-zero seconds', async () => {
    const now = new Date('2020-01-01T00:00:00.500Z');
    jest.useFakeTimers().setSystemTime(now);

    const { result, unmount } = renderHook(() => useClockState());
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:00.500Z'));

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:01.000Z'));

    jest.advanceTimersByTime(500);
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:01.000Z'));

    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toStrictEqual(new Date('2020-01-01T00:00:02.000Z'));

    unmount();
  });
});
