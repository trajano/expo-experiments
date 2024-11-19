import { PdfView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { ImageStyle, Button, useWindowDimensions, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
  );
  const [pageCount, setPageCount] = useState(1);
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
        height: (windowDimensions.width / viewport.width) * viewport.height,
        // aspectRatio: viewport.width / viewport.height,
      };
    }
  }, [windowDimensions.width, viewport]);
  const handleViewPortKnown = useCallback(
    (nextViewport: PdfViewPortEventData) => {
      console.log({ nextViewport });
      setViewport(nextViewport);
    },
    [],
  );
  const pagerViewRef = useRef<PagerView>(null);
  const flip = useCallback(() => {
    const samples = [
      'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
      'https://trajano.net/assets/Archimedes%20Trajano.pdf',
      'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    ];

    const randomUri = samples[Math.floor(Math.random() * samples.length)];
    setUri(randomUri);
    pagerViewRef.current?.setPage(0);
  }, []);
  const pages = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (pageNumber) => (
          <View key={pageNumber}>
            <PdfView
              uri={uri}
              cachePolicy={'disk'}
              pageNumber={pageNumber}
              onError={(error) => {
                console.error(error);
              }}
              onViewPortKnown={handleViewPortKnown}
              onPageCountKnown={(pageCountData) =>
                setPageCount(pageCountData.pageCount)
              }
              style={imageDimensions}
            />
            <Button onPress={flip} title={uri} />
          </View>
        ),
      ),
    [uri, handleViewPortKnown, imageDimensions, pageCount, flip],
  );
  return (
    <PagerView
      initialPage={0}
      ref={pagerViewRef}
      style={{ flex: 1, backgroundColor: 'beige' }}
    >
      {pages}
    </PagerView>
  );
};

export default ResumeScreen;
