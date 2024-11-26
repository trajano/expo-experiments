import { PdfPipelineView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button, useWindowDimensions } from 'react-native';
import samples from '@/data/samplePdfUrls.json';
import { ImageStyle } from 'expo-image';
import { WithPdfView } from 'react-native-pdf-view/src/PdfPipeline';
import * as Crypto from 'expo-crypto';

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
    const randomUri = samples[Crypto.getRandomBytes(1)[0] % samples.length];
    setUri(randomUri);
  }, []);
  return (
    <>
      <PdfPipelineView
        uri={uri}
        style={viewDimensions}
        onPageCountKnown={(e) => {
          console.log(e);
        }}
        onError={(e) => {
          console.error(e);
        }}
        onViewPortKnown={handleViewPortKnown}
      />
      <Button title={uri} onPress={flip} />
    </>
  );
};

const CompositeScreen = WithPdfView(ResumeScreen);
export default CompositeScreen;
