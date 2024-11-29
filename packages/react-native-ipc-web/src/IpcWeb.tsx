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
import { IpcWebView } from './IpcWebView';
import {
  WebViewErrorEvent,
  WebViewMessageEvent,
} from 'react-native-webview/src/WebViewTypes';
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
  /**
   * Will be set to true once the web view is loaded.
   */
  ipcWebViewReadyPromise: Promise<boolean>;
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
  ipcWebViewReadyPromise: Promise.resolve(true),
});

/**
 * Props type for the DoNothingProvider component, which wraps its children in the DoNothingContext.
 */
export type IpcWebProps<T extends object> = PropsWithChildren<{
  /**
   * HTML source provider.  It allows async operations to populate the source
   */
  sourceProvider: () => Promise<string>;
  /**
   * handles messages sent from the web view
   * @param message message
   */
  onMessage: (message: T) => void;
}>;
export const IpcWebConsumer = IpcWebContext.Consumer;
/**
 * A provider component for the DoNothingContext.
 *
 * @param sourceProvider HTML source provider
 * @param onMessage message handler
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
  const resolveIpcWebViewReadyRef = useRef<(value: boolean) => void>();
  const rejectIpcWebViewReadyRef = useRef<(error: unknown) => void>();

  const ipcWebViewReadyPromise = useRef(
    new Promise<boolean>((resolve, reject) => {
      resolveIpcWebViewReadyRef.current = resolve; // Store the resolve function
      rejectIpcWebViewReadyRef.current = reject;
    }),
  ).current;
  const ipcOnLoad = useCallback(() => {
    resolveIpcWebViewReadyRef.current &&
      resolveIpcWebViewReadyRef.current(true);
  }, []);
  const ipcOnError = useCallback((event: WebViewErrorEvent) => {
    if (rejectIpcWebViewReadyRef.current) {
      rejectIpcWebViewReadyRef.current(
        new Error(`Webview Error: ${event.nativeEvent.code}`),
      );
    }
  }, []);
  const ContextIpcWebView = useMemo<FC<Record<string, never>>>(() => {
    // The random UUID is needed to allow reloads
    // eslint-disable-next-line react/display-name
    return () => (
      <IpcWebView
        sourceProvider={sourceProvider}
        onMessage={ipcOnMessage}
        onLoad={ipcOnLoad}
        onError={ipcOnError}
        ref={ipcWebViewRef}
      />
    );
  }, [sourceProvider, ipcOnMessage, ipcOnLoad, ipcOnError]);
  ContextIpcWebView.displayName = 'IpcWebView';

  const postMessage = useCallback((message: object) => {
    const messageString = JSON.stringify(message);
    // see https://github.com/react-native-webview/react-native-webview/issues/2779
    // see https://github.com/react-native-webview/react-native-webview/issues/2980
    // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    ipcWebViewRef.current?.injectJavaScript(
      `window.postMessage('${messageString}', '*')`,
    );
  }, []);

  const value = useMemo<IpcWeb>(
    () => ({
      IpcWebView: ContextIpcWebView,
      postMessage,
      ipcWebViewReadyPromise,
    }),
    [ContextIpcWebView, postMessage, ipcWebViewReadyPromise],
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
