import { PdfPipelineView, PdfViewPortEventData } from 'react-native-pdf-view';
import { FC, useCallback, useMemo, useState } from 'react';
import { Button, useWindowDimensions } from 'react-native';
import samples from '@/data/samplePdfUrls.json';
import { ImageStyle } from 'expo-image';
import {
  usePdfPipeline,
  WithPdfView,
} from 'react-native-pdf-view/src/PdfPipeline';

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
  const { postPdfRequest } = usePdfPipeline();
  const send = useCallback(() => {
    const pdfData =
      'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
      'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
      'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
      'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
      'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
      'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
      'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
      'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
      'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
      'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
      'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
      'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
      'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';

    postPdfRequest(Math.random().toString(), pdfData);
  }, []);

  return (
    <>
      <PdfPipelineView
        uri={uri}
        style={{ height: 300, width: 300, backgroundColor: 'gray' }}
      />
      <Button title="send" onPress={send} />
      <Button title={uri} onPress={flip} />
    </>
  );
};

const CompositeScreen = WithPdfView(ResumeScreen);
export default CompositeScreen;
