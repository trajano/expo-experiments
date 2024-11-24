/**
 * @jest-environment node
 */
import { act, renderHook } from '@testing-library/react-native';
import { useState } from 'react';
import { useRenderCount } from './useRenderCount';

describe('useRenderCount', () => {
  it('initially returns 1', () => {
    const { result } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);
  });

  it('updates when state changes', async () => {
    const { result } = renderHook(() => {
      const [text, setText] = useState('');
      const renderCount = useRenderCount();
      return { setText, renderCount, text };
    });
    expect(result.current.renderCount).toBe(1);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('b'));
    expect(result.current.renderCount).toBe(3);
  });

  it('updates when state changes with the same value', async () => {
    // this one isn't rendering the way I expect it
    // https://stackoverflow.com/questions/79219251/react-render-behaviour-when-state-changes
    const { result } = renderHook(() => {
      const [text, setText] = useState('');
      const renderCount = useRenderCount();
      return { setText, renderCount, text };
    });
    expect(result.current.renderCount).toBe(1);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('a'));
    expect(result.current.renderCount).toBe(2);
    await act(async () => result.current.setText('b'));
    expect(result.current.renderCount).toBe(4);
  });
});
