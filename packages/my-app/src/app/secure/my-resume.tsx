import Pdf from 'react-native-pdf';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button, ImageStyle, useWindowDimensions, View } from 'react-native';

const samples = [
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  'https://trajano.net/assets/Archimedes%20Trajano.pdf',
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  'http://samples.leanpub.com/thereactnativebook-sample.pdf',
];

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  );
  const windowDimensions = useWindowDimensions();
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const viewDimensions = useMemo<ImageStyle>(() => {
    if (viewWidth === 0 || viewHeight === 0) {
      return {
        width: windowDimensions.width,
        height: 1,
      };
    } else {
      return {
        width: windowDimensions.width,
        height: (windowDimensions.width / viewWidth) * viewHeight,
      };
    }
  }, [windowDimensions.width, viewWidth, viewHeight]);
  const handleViewPortKnown = useCallback(
    (
      _numberOfPages: number,
      _path: string,
      size: { height: number; width: number },
    ) => {
      setViewWidth(size.width);
      setViewHeight(size.height);
    },
    [],
  );
  const flip = useCallback(() => {
    const randomUri = samples[Math.floor(Math.random() * samples.length)];
    setUri(randomUri);
  }, []);

  return (
    <View>
      <Pdf
        source={{ uri }}
        onLoadComplete={handleViewPortKnown}
        onError={(error) => {
          console.error(error);
        }}
        style={viewDimensions}
      />
      <Button title={uri} onPress={flip} />
    </View>
  );
};

export default ResumeScreen;
