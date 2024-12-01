import Pdf from 'react-native-pdf';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button, useWindowDimensions, View, ViewStyle } from 'react-native';
import samples from '@/data/samplePdfUrls.json';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(samples[0]);
  const windowDimensions = useWindowDimensions();
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfHeight, setPdfHeight] = useState(0);
  const viewDimensions = useMemo<ViewStyle>(() => {
    if (pdfWidth === 0 || pdfHeight === 0) {
      return {
        width: windowDimensions.width,
        height: 1,
      };
    } else {
      return {
        width: windowDimensions.width,
        height: (windowDimensions.width / pdfWidth) * pdfHeight,
      };
    }
  }, [windowDimensions.width, pdfWidth, pdfHeight]);
  const handleViewPortKnown = useCallback(
    (
      _numberOfPages: number,
      _path: string,
      size: { height: number; width: number },
    ) => {
      setPdfWidth(size.width);
      setPdfHeight(size.height);
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
        fitPolicy={0}
        progressContainerStyle={viewDimensions}
      />
      <Button title={uri} onPress={flip} />
    </View>
  );
};

export default ResumeScreen;
