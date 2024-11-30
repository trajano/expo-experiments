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

type BackgroundFetchRegistration = {
  taskName: string;
  registered: boolean;
};

/**
 * Interface representing an empty context value for the MyBackgroundFetch context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface MyBackgroundFetch {
  registrations: BackgroundFetchRegistration[];
  status: BackgroundFetch.BackgroundFetchStatus | null;
}

/**
 * The MyBackgroundFetchContext provides an empty context value. This is exported
 * so that it can be used by tests, but generally the {@link MyBackgroundFetchProvider}
 * is used.
 */
export const MyBackgroundFetchContext = createContext<MyBackgroundFetch>({
  registrations: [],
  status: null,
});

/**
 * Props type for the MyBackgroundFetchProvider component, which wraps its children in the MyBackgroundFetchContext.
 */
export type MyBackgroundFetchProps = PropsWithChildren<
  {
    backgroundFetchTaskNames: string | string[];
  } & BackgroundFetch.BackgroundFetchOptions
>;

const registerBackgroundFetchAsync = async (
  backgroundFetchTaskName: string,
  minimumInterval: number,
) =>
  BackgroundFetch.registerTaskAsync(backgroundFetchTaskName, {
    minimumInterval,
    startOnBoot: true,
    stopOnTerminate: false,
  });

const updateBackgroundFetchRegistrationAsync = async (
  backgroundFetchTaskNames: string[],
  backgroundFetchRegistrations: BackgroundFetchRegistration[],
  minimumInterval: number,
) => {
  const backgroundTasksToRegister = backgroundFetchRegistrations
    .filter((registration) =>
      backgroundFetchTaskNames.find(
        (it) => it === registration.taskName && !registration.registered,
      ),
    )
    .map((it) => it.taskName);
  const backgroundTasksToUnregister = backgroundFetchRegistrations
    .filter(
      (registration) =>
        backgroundFetchTaskNames.findIndex(
          (it) => it === registration.taskName,
        ) === -1,
    )
    .map((it) => it.taskName);
  for (const backgroundFetchTaskName of backgroundTasksToUnregister) {
    await BackgroundFetch.unregisterTaskAsync(backgroundFetchTaskName);
  }
  for (const backgroundFetchTaskName of backgroundTasksToRegister) {
    await registerBackgroundFetchAsync(
      backgroundFetchTaskName,
      minimumInterval,
    );
  }
};
/**
 * A provider component for the MyBackgroundFetchContext.
 *
 * @param backgroundFetchTaskNames background fetch task names
 * @param minimumInterval minimum interval, defaults to 10 minutes
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const MyBackgroundFetchProvider: FC<MyBackgroundFetchProps> = ({
  backgroundFetchTaskNames: inBackgroundFetchTaskNames,
  minimumInterval = 600,
  children,
}) => {
  const backgroundFetchTaskNames = useMemo(
    () =>
      Array.isArray(inBackgroundFetchTaskNames)
        ? inBackgroundFetchTaskNames
        : [inBackgroundFetchTaskNames],
    [inBackgroundFetchTaskNames],
  );
  const [registrations, setRegistrations] = useState<
    BackgroundFetchRegistration[]
  >([]);
  const [status, setStatus] =
    useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  useEffect(() => {
    let mounted = true;
    const getRegisteredBackgroundTasksAsync = async (): Promise<
      BackgroundFetchRegistration[]
    > =>
      (await TaskManager.getRegisteredTasksAsync())
        .filter((it) => it.taskType === 'backgroundFetch')
        .map((it) => ({ taskName: it.taskName, registered: true }));

    (async () => {
      const nextBackgroundFetchStatus = await BackgroundFetch.getStatusAsync();
      const nextRegistrations = await getRegisteredBackgroundTasksAsync();
      if (mounted) {
        setStatus(nextBackgroundFetchStatus);
        setRegistrations(nextRegistrations);
      }
      if (
        nextBackgroundFetchStatus ===
        BackgroundFetch.BackgroundFetchStatus.Available
      ) {
        await updateBackgroundFetchRegistrationAsync(
          backgroundFetchTaskNames,
          nextRegistrations,
          minimumInterval,
        );
        const nextNextRegistrations = await getRegisteredBackgroundTasksAsync();
        if (mounted) {
          setRegistrations(nextNextRegistrations);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [backgroundFetchTaskNames, minimumInterval]);
  const value = useMemo<MyBackgroundFetch>(
    () => ({ registrations, status }),
    [registrations, status],
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
    backgroundFetchTaskNames,
    ...props
  }: P & MyBackgroundFetchProps) => (
    <MyBackgroundFetchProvider
      backgroundFetchTaskNames={backgroundFetchTaskNames}
    >
      <Component {...(props as P)} />
    </MyBackgroundFetchProvider>
  );

  WrappedComponent.displayName = `WithMyBackgroundFetch(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
