/**
 * A context that provides no specific functionality. This serves as a template for developers
 * to create React Context-based implementations and includes a higher-order component (HOC) version.
 */
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave

/**
 * Interface representing an empty context value for the MyBackgroundFetch context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface MyBackgroundFetch {
  registered: boolean;
  status: BackgroundFetch.BackgroundFetchStatus | null;
}

/**
 * The MyBackgroundFetchContext provides an empty context value. This is exported
 * so that it can be used by tests, but generally the {@link MyBackgroundFetchProvider}
 * is used.
 */
export const MyBackgroundFetchContext = createContext<MyBackgroundFetch>({
  registered: false,
  status: null,
});

/**
 * Props type for the MyBackgroundFetchProvider component, which wraps its children in the MyBackgroundFetchContext.
 */
export type MyBackgroundFetchProps = PropsWithChildren<{
  backgroundFetchTaskName: string;
}>;

/**
 * A provider component for the MyBackgroundFetchContext.
 *
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const MyBackgroundFetchProvider: FC<MyBackgroundFetchProps> = ({
  backgroundFetchTaskName,
  children,
}) => {
  const [registered, setRegistered] = useState(false);
  const [status, setStatus] =
    useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  useEffect(() => {
    let mounted = true;
    const registerBackgroundFetchAsync = async () =>
      BackgroundFetch.registerTaskAsync(backgroundFetchTaskName, {
        minimumInterval: 60 * 15, // 15 minutes
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
      });
    (async () => {
      const nextBackgroundFetchStatus = await BackgroundFetch.getStatusAsync();
      const nextRegistered = await TaskManager.isTaskRegisteredAsync(
        backgroundFetchTaskName,
      );
      if (mounted) {
        setStatus(nextBackgroundFetchStatus);
        setRegistered(nextRegistered);
      }
      if (
        nextBackgroundFetchStatus ===
          BackgroundFetch.BackgroundFetchStatus.Available &&
        !nextRegistered
      ) {
        await registerBackgroundFetchAsync();
        if (mounted) {
          setRegistered(true);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [backgroundFetchTaskName]);
  const value = useMemo<MyBackgroundFetch>(
    () => ({ registered, status }),
    [registered, status],
  );

  return (
    <MyBackgroundFetchContext.Provider value={value}>
      {children}
    </MyBackgroundFetchContext.Provider>
  );
};

/**
 * Hook to consume the MyBackgroundFetchContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useMyBackgroundFetch = () => useContext(MyBackgroundFetchContext);

/**
 * A higher-order component (HOC) that wraps a given component with the MyBackgroundFetchProvider,
 * allowing the wrapped component to access the MyBackgroundFetchContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the MyBackgroundFetchProvider.
 */
export const WithMyBackgroundFetch = <P extends object>(
  Component: ComponentType<P>,
): FC<P & MyBackgroundFetchProps> => {
  const WrappedComponent = ({
    backgroundFetchTaskName,
    ...props
  }: P & MyBackgroundFetchProps) => (
    <MyBackgroundFetchProvider
      backgroundFetchTaskName={backgroundFetchTaskName}
    >
      <Component {...(props as P)} />
    </MyBackgroundFetchProvider>
  );

  WrappedComponent.displayName = `WithMyBackgroundFetch(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
