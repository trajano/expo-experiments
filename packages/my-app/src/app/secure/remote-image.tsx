import { Image } from 'expo-image';
import { FC } from 'react';

const RemoteImageScreen: FC = () => {
  return (
    <Image
      source={{
        uri: 'https://trajano.net/img/snow-in-scarborough-576p-moz.6a6cb352.jpg',
      }}
      cachePolicy="none"
    />
  );
};

export default RemoteImageScreen;
