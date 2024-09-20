import {
  ComponentType,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ErrorHandlerCallback } from 'react-native';

export type FallbackComponentProps = {
  error: unknown;
  isFatal: boolean;
};
export const Try: FC<
  PropsWithChildren<{ Catch: ComponentType<FallbackComponentProps> }>
> = ({ Catch, children }) => {
  const [error, setError] = useState<unknown>();
  const [isFatal, setIsFatal] = useState(false);
  const errorCallback: ErrorHandlerCallback = useCallback(
    (nextError, nextIsFatal) => {
      setError(nextError);
      setIsFatal(nextIsFatal);
    },
    [],
  );

  useEffect(() => {
    const previousGlobalHandler = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler(errorCallback);
    return () => global.ErrorUtils.setGlobalHandler(previousGlobalHandler);
  }, [errorCallback]);

  if (error) {
    return <Catch error={error} isFatal={isFatal} />;
  }
  return children;
};
