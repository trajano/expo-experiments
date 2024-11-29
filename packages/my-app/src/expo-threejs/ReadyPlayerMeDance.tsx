import { WebView, WebViewProps } from 'react-native-webview';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export type ReadyPlayerMeDanceProps = Omit<
  WebViewProps,
  'source' | 'originWhiteList'
> & {
  fbxAnimationUri?: string;
  animationResource?: number;

  modelUri?: string;
  avatarId?: string;
};

type AnimationRetargetingViewProps = Omit<
  ReadyPlayerMeDanceProps,
  'avatarId' | 'animationResource' | 'fbxAnimationUri'
> & {
  animationUri: string | null;
  modelUri: string | null;
};

const AnimationRetargetingView: FC<AnimationRetargetingViewProps> = ({
  animationUri,
  modelUri,
  ...props
}) => {
  const [htmlUri, setHtmlUri] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const [htmlAsset] = await Asset.loadAsync(
        require('./animation-retargeting.html'),
      );
      if (mounted) {
        setHtmlUri(htmlAsset.localUri);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const webviewRef = useRef<WebView>(null);
  const handleMessage = useCallback(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      const messageString = JSON.stringify({
        fbxAnimationUri: animationUri,
        remoteModelUri: modelUri,
      });
      webviewRef.current?.injectJavaScript(
        `window.postMessage('${messageString}', '*')`,
      );
    }
  }, [animationUri, modelUri, loaded]);

  if (animationUri === null || htmlUri === null || modelUri === null) {
    return null;
  }
  return (
    <WebView
      {...props}
      allowFileAccessFromFileURLs
      allowFileAccess
      allowingReadAccessToURL={FileSystem.cacheDirectory!}
      webviewDebuggingEnabled={__DEV__}
      originWhitelist={['*']}
      bounces={false}
      onMessage={handleMessage}
      ref={webviewRef}
      source={{ uri: htmlUri }}
    />
  );
};
/**
 * This component is for
 */
export const ReadyPlayerMeDance: FC<ReadyPlayerMeDanceProps> = ({
  fbxAnimationUri,
  animationResource,
  modelUri,
  avatarId,
  ...avatarInfoProps
}) => {
  const [animationLocalFileUri, setAnimationLocalFileUri] = useState<
    string | null
  >(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!animationResource) {
        return;
      }
      const [download] = await Asset.loadAsync(animationResource);
      if (mounted) {
        setAnimationLocalFileUri(download.localUri);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [animationResource]);
  const remoteModelUri = useMemo(() => {
    if (modelUri) {
      return modelUri;
    } else {
      return `https://models.readyplayer.me/${avatarId}.glb`;
    }
  }, [modelUri, avatarId]);

  const animationUri = useMemo(
    () => fbxAnimationUri ?? animationLocalFileUri,
    [animationLocalFileUri, fbxAnimationUri],
  );
  return (
    <AnimationRetargetingView
      animationUri={animationUri}
      modelUri={remoteModelUri}
      {...avatarInfoProps}
    />
  );
};
