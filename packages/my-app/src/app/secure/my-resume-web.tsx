import { PdfView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button, ImageStyle, useWindowDimensions, View } from 'react-native';

const samples = [
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  'https://trajano.net/assets/Archimedes%20Trajano.pdf',
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
  'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf',
  'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-with-images.pdf',
];

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(
    'https://trajano.net/assets/Archimedes%20Trajano.pdf',
  );
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
