import { PdfView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  ImageStyle,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(
    'https://trajano.net/assets/Archimedes%20Trajano.pdf',
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
        aspectRatio: viewport.width / viewport.height,
      };
    }
  }, [windowDimensions.width, viewport]);
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
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      'https://www.africau.edu/images/default/sample.pdf',
    ];

    const randomUri = samples[Math.floor(Math.random() * samples.length)];
    setUri(randomUri);
  }, []);
  const pages = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, index) => index + 1)
        .map((it) => {
          console.log('X', it);
          return it;
        })
        .map((pageNumber) => (
          <TouchableOpacity onPress={flip}>
            <PdfView
              uri={uri}
              key={uri + '.' + pageNumber}
              cachePolicy={'none'}
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
          </TouchableOpacity>
        )),
    [uri, flip, handleViewPortKnown, imageDimensions, pageCount],
  );
  console.log(uri, pages);
  return (
    // <TouchableOpacity onPress={flip}>
    //   <PdfView
    //     uri={uri}
    //     key={uri + '.' + 1}
    //     cachePolicy={'none'}
    //     pageNumber={1}
    //     onError={(error) => {
    //       console.error(error);
    //     }}
    //     onViewPortKnown={handleViewPortKnown}
    //     onPageCountKnown={(pageCountData) =>
    //       setPageCount(pageCountData.pageCount)
    //     }
    //     style={imageDimensions}
    //   />
    // </TouchableOpacity>

    <PagerView initialPage={0} style={{ flex: 1, backgroundColor: 'red' }}>
      {pages}
    </PagerView>
  );
};

export default ResumeScreen;
