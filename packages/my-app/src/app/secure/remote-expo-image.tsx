import { Image, ImageLoadEventData, ImageStyle } from 'expo-image';
import { FC, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';

const RemoteExpoImageScreen: FC = () => {
  const windowDimensions = useWindowDimensions();
  const [source, setSource] = useState<ImageLoadEventData['source'] | null>(
    null,
  );
  const imageDimensions = useMemo<ImageStyle>(() => {
    if (!source) {
      return {
        width: windowDimensions.width,
        height: 1,
      };
    } else {
      return {
        width: windowDimensions.width,
        aspectRatio: source.width / source.height,
      };
    }
  }, [source, windowDimensions.width]);
  return (
    <Image
      source={{
        uri: 'https://dummyjson.com/image/300x300?delay=5000',
      }}
      cachePolicy="none"
      onError={(error) => {
        console.error(error);
      }}
      onLoad={({ source }) => {
        setSource(source);
      }}
      style={imageDimensions}
    />
  );
};

export default RemoteExpoImageScreen;
