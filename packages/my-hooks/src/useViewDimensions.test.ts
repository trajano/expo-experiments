import { act, renderHook } from '@testing-library/react-native';
import { useViewDimensions } from './useViewDimensions';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 360, height: 640 })), // Mock screen dimensions
  },
}));

describe('useViewDimensions', () => {
  it('returns default dimensions with initial height', () => {
    const { result } = renderHook(() => useViewDimensions(100));

    expect(result.current.dimensions).toEqual({
      x: 0,
      y: 0,
      width: 360,
      height: 100,
    });
  });

  it('updates dimensions when width and height are set', () => {
    const { result } = renderHook(() => useViewDimensions(100));

    act(() => {
      result.current.setWidth(200);
      result.current.setHeight(400);
    });

    expect(result.current.dimensions).toEqual({
      x: 0,
      y: 0,
      width: 360,
      height: (360 / 200) * 400, // Height calculated dynamically
    });
  });

  it('falls back to initialHeight when no width and height are set', () => {
    const { result } = renderHook(() => useViewDimensions(50));

    expect(result.current.dimensions).toEqual({
      x: 0,
      y: 0,
      width: 360,
      height: 50,
    });
  });

  it('handles zero width or height correctly', () => {
    const { result } = renderHook(() => useViewDimensions(100));

    act(() => {
      result.current.setWidth(0); // Set width to 0
    });

    expect(result.current.dimensions).toEqual({
      x: 0,
      y: 0,
      width: 360,
      height: 100, // Should fall back to initial height
    });
  });

  it('handles zero width or height correctly default height', () => {
    const { result } = renderHook(() => useViewDimensions());

    act(() => {
      result.current.setWidth(0); // Set width to 0
    });

    expect(result.current.dimensions).toEqual({
      x: 0,
      y: 0,
      width: 360,
      height: 1, // Should fall back to initial height
    });
  });
});
