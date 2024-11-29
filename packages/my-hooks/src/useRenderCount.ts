import { useRef } from 'react';

export const useRenderCount = () => {
  const renderCount = useRef(0);
  return ++renderCount.current;
};
