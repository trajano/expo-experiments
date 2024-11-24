/**
 * A context that provides no specific functionality. This serves as a template for developers
 * to create React Context-based implementations and includes a higher-order component (HOC) version.
 */
import {
  ComponentType,
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { IpcWebView } from '@/components/IpcWeb/IpcWebView';
import { WebViewMessageEvent } from 'react-native-webview/src/WebViewTypes';
import { WebView } from 'react-native-webview';

/**
 * Interface representing an empty context value for the DoNothing context.
 * This interface can be expanded to include any values needed by the context.
 */
export interface IpcWeb {
  /**
   * This is the web view that will be doing the IPC processing.  It is an absolute positioned webview
   * with 0 opacity and -9999 zIndex (in other words, practically invisible).
   */
  IpcWebView: FC<Record<string, never>>;
  /**
   * Sends a message to the IpcWebView.  This will perform JSON stringification automatically.
   * @param message message
   */
  postMessage: (message: object) => void;
}

/**
 * The DoNothingContext provides an empty context value. This is exported
 * so that it can be used by tests, but generally the {@link IpcWebProvider}
 * is used.
 */
export const IpcWebContext = createContext<IpcWeb>({
  IpcWebView: () => (
    <IpcWebView sourceProvider={async () => ''} onMessage={() => {}} />
  ),
  postMessage: () => {},
});

/**
 * Props type for the DoNothingProvider component, which wraps its children in the DoNothingContext.
 */
export type IpcWebProps<T extends object> = PropsWithChildren<{
  sourceProvider: () => Promise<string>;
  onMessage: (message: T) => void;
}>;

/**
 * A provider component for the DoNothingContext.
 *
 * @param children The child components that will have access to the context.
 * @returns A provider that passes an empty value to all of its children.
 */
export const IpcWebProvider = <T extends object>({
  sourceProvider,
  onMessage,
  children,
}: IpcWebProps<T>): ReactElement => {
  const ipcWebViewRef = useRef<WebView>(null);
  const ipcOnMessage = useCallback(
    ({ nativeEvent }: WebViewMessageEvent) => {
      onMessage(JSON.parse(nativeEvent.data));
    },
    [onMessage],
  );
  const ContextIpcWebView = useMemo<FC<Record<string, never>>>(() => {
    return () => (
      <IpcWebView
        sourceProvider={sourceProvider}
        onMessage={ipcOnMessage}
        ref={ipcWebViewRef}
      />
    );
  }, [sourceProvider]);
  ContextIpcWebView.displayName = 'IpcWebView';

  const postMessage = useCallback((message: object) => {
    ipcWebViewRef.current?.postMessage(JSON.stringify(message));
  }, []);

  const value = useMemo<IpcWeb>(
    () => ({
      IpcWebView: ContextIpcWebView,
      postMessage,
    }),
    [ContextIpcWebView, postMessage],
  );

  return (
    <IpcWebContext.Provider value={value}>{children}</IpcWebContext.Provider>
  );
};

/**
 * Hook to consume the DoNothingContext. This hook allows components to access the empty context value.
 *
 * @returns The current context value, which is an empty object.
 */
export const useIpcWeb = () => useContext(IpcWebContext);

/**
 * A higher-order component (HOC) that wraps a given component with the DoNothingProvider,
 * allowing the wrapped component to access the DoNothingContext.
 *
 * @param Component The component to be wrapped.
 * @returns A new component wrapped with the DoNothingProvider.
 */
export const WithIpcWeb = <P extends object, T extends object>(
  Component: ComponentType<P>,
): FC<P & IpcWebProps<T>> => {
  const WrappedComponent = ({
    sourceProvider,
    onMessage,
    ...props
  }: P & IpcWebProps<T>) => (
    <IpcWebProvider sourceProvider={sourceProvider} onMessage={onMessage}>
      <Component {...(props as P)} />
    </IpcWebProvider>
  );

  WrappedComponent.displayName = `WithIpcWeb(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};
