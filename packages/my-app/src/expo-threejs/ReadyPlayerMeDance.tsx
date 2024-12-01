import { WebView, WebViewProps } from 'react-native-webview';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export type ReadyPlayerMeDanceProps = Omit<
  WebViewProps,
  'source' | 'originWhiteList' | 'onMessage'
> & {
  fbxAnimationUri?: string;
  animationResource?: number;

  modelUri?: string;
  avatarId?: string;
};

type AnimationRetargetingViewProps = Omit<
  WebViewProps,
  'source' | 'onMessage'
> & {
  animationUri: string | null;
  modelUri: string | null;
  cacheDirectory?: string;
};

const AnimationRetargetingView: FC<AnimationRetargetingViewProps> = ({
  animationUri,
  modelUri,
  cacheDirectory = FileSystem.cacheDirectory! + 'animation-retargeting/',
  ...props
}) => {
  const [htmlUri, setHtmlUri] = useState<string | null>(null);
  const commonFileUri = useMemo(() => {
    // Helper function to extract the base directory from a file URI
    const getBaseDirectory = (uri: string) => {
      const lastSlashIndex = uri.lastIndexOf('/');
      return lastSlashIndex !== -1 ? uri.substring(0, lastSlashIndex + 1) : uri;
    };

    const uris = [modelUri, animationUri, htmlUri].filter((uri) =>
      uri?.startsWith('file://'),
    ) as string[];

    // Ensure cacheDirectory is included as it is guaranteed to start with "file://"
    uris.push(cacheDirectory);

    // Compute the common base directory
    let commonBase = getBaseDirectory(uris[0]);
    for (const uri of uris) {
      while (!uri.startsWith(commonBase)) {
        // Trim the trailing slash and the last segment
        commonBase = commonBase
          .slice(0, -1)
          .substring(0, commonBase.lastIndexOf('/') + 1);
      }
    }

    return commonBase;
  }, [modelUri, animationUri, cacheDirectory, htmlUri]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const [htmlAsset] = await Asset.loadAsync(
        require('./animation-retargeting.html'),
      );
      await FileSystem.makeDirectoryAsync(cacheDirectory, {
        intermediates: true,
      });
      const nextHtmlUri = cacheDirectory + 'animation-retargeting.html';

      await Promise.all([
        FileSystem.copyAsync({
          from: htmlAsset.localUri!,
          to: nextHtmlUri,
        }),
        FileSystem.downloadAsync(
          'https://threejs.org/build/three.core.js',
          `${cacheDirectory}three.core.js`,
          {
            cache: true,
          },
        ),
        FileSystem.downloadAsync(
          'https://threejs.org/build/three.tsl.js',
          `${cacheDirectory}three.tsl.js`,
          {
            cache: true,
          },
        ),
        FileSystem.downloadAsync(
          'https://threejs.org/build/three.webgpu.js',
          `${cacheDirectory}three.webgpu.js`,
          {
            cache: true,
          },
        ),
      ]);

      if (mounted) {
        setHtmlUri(nextHtmlUri);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [cacheDirectory]);
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
      allowingReadAccessToURL={commonFileUri}
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
