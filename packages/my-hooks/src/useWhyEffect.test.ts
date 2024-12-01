import { renderHook, act } from '@testing-library/react-native';
import { useState } from 'react';
import { useWhyEffect } from './useWhyEffect';

describe('useWhyEffect', () => {
  it('should be quiet if there are no dependencies', () => {
    const logSpy = jest.spyOn(console, 'debug').mockImplementation();
    const mockEffect = jest.fn();
    renderHook(() => {
      useWhyEffect(mockEffect, []);
      return {};
    });
    expect(mockEffect).toHaveBeenCalledTimes(1);
    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it('should detect changes in dependencies and trigger the callback with the correct indices', () => {
    const mockEffect = jest.fn();
    const mockOnChange = jest.fn();

    const { result } = renderHook(() => {
      const [deps, setDeps] = useState<any[]>([1, 'test', true]);

      useWhyEffect(mockEffect, deps, mockOnChange);

      return { setDeps };
    });

    // Initially, no changes should be detected
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(mockEffect).toHaveBeenCalledTimes(1);

    // Clear mocks for the next step
    mockEffect.mockClear();
    mockOnChange.mockClear();

    // Update dependencies manually using act
    act(() => {
      result.current.setDeps([2, 'test', true]); // First dependency changes
    });

    // Now the mockOnChange should have been called with the index of the changed dependency
    expect(mockOnChange).toHaveBeenCalledWith([0]);
    expect(mockEffect).toHaveBeenCalledTimes(1); // Effect runs again

    // Clear mocks for the next step
    mockOnChange.mockClear();
    mockEffect.mockClear();

    // Another change in dependencies
    act(() => {
      result.current.setDeps([2, 'newTest', true]); // Second dependency changes
    });

    expect(mockOnChange).toHaveBeenCalledWith([1]);
    expect(mockEffect).toHaveBeenCalledTimes(1);

    // Clear mocks for the next step
    mockOnChange.mockClear();
    mockEffect.mockClear();

    // Multiple changes in dependencies
    act(() => {
      result.current.setDeps([3, 'newTest', false]); // First and third dependencies change
    });

    expect(mockOnChange).toHaveBeenCalledWith([0, 2]);
    expect(mockEffect).toHaveBeenCalledTimes(1); // Effect runs again
  });

  it('should detect changes in dependencies and trigger the callback with the correct indices using default logger', () => {
    const mockEffect = jest.fn();
    const logSpy = jest.spyOn(console, 'debug').mockImplementation();

    const { result } = renderHook(() => {
      const [deps, setDeps] = useState<any[]>([1, 'test', true]);

      useWhyEffect(mockEffect, deps);

      return { setDeps };
    });

    // Initially, no changes should be detected
    expect(logSpy).not.toHaveBeenCalled();
    expect(mockEffect).toHaveBeenCalledTimes(1);

    // Clear mocks for the next step
    mockEffect.mockClear();
    logSpy.mockClear();

    // Update dependencies manually using act
    act(() => {
      result.current.setDeps([2, 'test', true]); // First dependency changes
    });

    // Now the mockOnChange should have been called with the index of the changed dependency
    expect(logSpy).toHaveBeenCalledWith('changedIndices: 0');
    expect(mockEffect).toHaveBeenCalledTimes(1); // Effect runs again

    // Clear mocks for the next step
    mockEffect.mockClear();
    logSpy.mockClear();

    // Another change in dependencies
    act(() => {
      result.current.setDeps([2, 'newTest', true]); // Second dependency changes
    });

    expect(logSpy).toHaveBeenCalledWith('changedIndices: 1');
    expect(mockEffect).toHaveBeenCalledTimes(1);

    // Clear mocks for the next step
    mockEffect.mockClear();
    logSpy.mockClear();

    // Multiple changes in dependencies
    act(() => {
      result.current.setDeps([3, 'newTest', false]); // First and third dependencies change
    });

    expect(mockEffect).toHaveBeenCalledTimes(1); // Effect runs again
    expect(logSpy).toHaveBeenCalledWith('changedIndices: 0,2');
    logSpy.mockRestore();
  });
});
