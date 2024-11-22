import { PdfView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button, useWindowDimensions, View } from 'react-native';
import samples from '@/data/samplePdfUrls.json';
import { ImageStyle } from 'expo-image';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(samples[0]);
  const windowDimensions = useWindowDimensions();
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfHeight, setPdfHeight] = useState(0);
  const viewDimensions = useMemo<ImageStyle>(() => {
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
    ({ height, width }: PdfViewPortEventData) => {
      setPdfWidth(width);
      setPdfHeight(height);
    },
    [],
  );
  const flip = useCallback(() => {
    const randomUri = samples[Math.floor(Math.random() * samples.length)];
    setUri(randomUri);
  }, []);

  return (
    <View>
      <PdfView
        uri={uri}
        onViewPortKnown={handleViewPortKnown}
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
