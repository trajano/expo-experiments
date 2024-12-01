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
import { updateBackgroundFetchRegistrationAsync } from './updateBackgroundFetchRegistrationAsync';
import { BackgroundFetchTaskRegistration } from './BackgroundFetchRegistration.types';

/**
 * Interface representing an empty context value for the MyBackgroundFetch context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface BackgroundFetchRegistration {
  registrations: BackgroundFetchTaskRegistration[];
  status: BackgroundFetch.BackgroundFetchStatus | null;
}

export const BackgroundFetchRegistrationContext =
  createContext<BackgroundFetchRegistration>({
    registrations: [],
    status: null,
  });

/**
 * Specifies the task names and the common BackgroundFetch options.
 */
export type BackgroundFetchRegistrationProps = PropsWithChildren<
  {
    /**
     * Task names that would be registered
     */
    backgroundFetchTaskNames: string | string[];
  } & BackgroundFetch.BackgroundFetchOptions
>;

/**
 * A provider component for the MyBackgroundFetchContext.
 *
 * @param backgroundFetchTaskNames background fetch task names
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const BackgroundFetchRegistrationProvider: FC<
  BackgroundFetchRegistrationProps
> = ({
  backgroundFetchTaskNames: inBackgroundFetchTaskNames,
  children,
  ...inBackgroundFetchOptions
}) => {
  const backgroundFetchTaskNames = useMemo(
    () =>
      Array.isArray(inBackgroundFetchTaskNames)
        ? inBackgroundFetchTaskNames
        : [inBackgroundFetchTaskNames],
    [inBackgroundFetchTaskNames],
  );
  const [registrations, setRegistrations] = useState<
    BackgroundFetchTaskRegistration[]
  >([]);
  /**
   * Background fetch options, but ensure that minimum interval is set.  This
   * is stored as a String to prevent effect triggers
   */
  const backgroundFetchOptionsJson = useMemo(
    () =>
      JSON.stringify({
        ...inBackgroundFetchOptions,
        minimumInterval: inBackgroundFetchOptions.minimumInterval ?? 600,
      }),
    [inBackgroundFetchOptions],
  );
  const [status, setStatus] =
    useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  useEffect(() => {
    let mounted = true;
    const getRegisteredBackgroundTasksAsync = async (): Promise<
      BackgroundFetchTaskRegistration[]
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
          JSON.parse(backgroundFetchOptionsJson),
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
  }, [backgroundFetchTaskNames, backgroundFetchOptionsJson]);
  const value = useMemo<BackgroundFetchRegistration>(
    () => ({ registrations, status }),
    [registrations, status],
  );

  return (
    <BackgroundFetchRegistrationContext.Provider value={value}>
      {children}
    </BackgroundFetchRegistrationContext.Provider>
  );
};

/**
 * Hook to consume the MyBackgroundFetchContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useBackgroundFetchRegistration = () =>
  useContext(BackgroundFetchRegistrationContext);

/**
 * A higher-order component (HOC) that wraps a given component with the MyBackgroundFetchProvider,
 * allowing the wrapped component to access the MyBackgroundFetchContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the MyBackgroundFetchProvider.
 */
export const WithBackgroundFetchRegistration = <P extends object>(
  Component: ComponentType<P>,
): FC<P & BackgroundFetchRegistrationProps> => {
  const WrappedComponent = ({
    backgroundFetchTaskNames,
    ...props
  }: P & BackgroundFetchRegistrationProps) => (
    <BackgroundFetchRegistrationProvider
      backgroundFetchTaskNames={backgroundFetchTaskNames}
    >
      <Component {...(props as P)} />
    </BackgroundFetchRegistrationProvider>
  );

  WrappedComponent.displayName = `WithBackgroundFetchRegistration(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
