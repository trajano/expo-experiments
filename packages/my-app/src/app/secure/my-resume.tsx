import { PdfView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  ImageStyle,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(
    'https://trajano.net/assets/Archimedes%20Trajano.pdf',
  );
  const windowDimensions = useWindowDimensions();
  const [viewport, setViewport] = useState<PdfViewPortEventData | null>(null);
  const imageDimensions = useMemo<ImageStyle>(() => {
    if (!viewport) {
      return {
        width: windowDimensions.width,
        height: 1,
      };
    } else {
      return {
        width: windowDimensions.width,
        aspectRatio: viewport.width / viewport.height,
      };
    }
  }, [viewport]);
  const handleViewPortKnown = useCallback(
    (nextViewport: PdfViewPortEventData) => {
      setViewport(nextViewport);
    },
    [],
  );
  const flip = useCallback(() => {
    const samples = [
      'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
      'https://trajano.net/assets/Archimedes%20Trajano.pdf',
      'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
    ];
    const randomUri = samples[Math.floor(Math.random() * samples.length)];
    console.log(randomUri);
    setUri(randomUri);
  }, [uri]);
  return (
    <TouchableOpacity onPress={flip}>
      <PdfView
        uri={uri}
        pageNumber={1}
        onError={(error) => {
          console.error(error);
        }}
        onViewPortKnown={handleViewPortKnown}
        style={imageDimensions}
      />
    </TouchableOpacity>
  );
};

export default ResumeScreen;
