import { PdfPipelineView } from 'react-native-pdf-view';
import { FC, useCallback, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import samples from '@/data/samplePdfUrls.json';
import { WithPdfView } from 'react-native-pdf-view/src/PdfPipeline';
import * as Crypto from 'expo-crypto';
import PagerView from 'react-native-pager-view';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(samples[0]);
  const [pageCount, setPageCount] = useState(1);
  const flip = useCallback(() => {
    const randomUri = samples[Crypto.getRandomBytes(1)[0] % samples.length];
    setUri(randomUri);
    setPageCount(1);
  }, []);
  console.debug({ uri, pageCount });
  return (
    <View style={styles.container}>
      <PagerView style={styles.pager}>
        {Array.from({ length: pageCount }, (_ignore, index) => index + 1).map(
          (pageNumber) => (
            <View key={`${uri}.${pageNumber}`}>
              <PdfPipelineView
                style={styles.pdf}
                uri={uri}
                pageNumber={pageNumber}
                onPageCountKnown={(e) => {
                  console.info(e);
                  if (pageNumber === 1) {
                    setPageCount(e.pageCount);
                  }
                }}
                onError={(e) => {
                  console.error(e);
                }}
              />
            </View>
          ),
        )}
      </PagerView>
      <Button title={uri} onPress={flip} />
    </View>
  );
};

const CompositeScreen = WithPdfView(ResumeScreen);
export default CompositeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pager: { flex: 1 },
  pdf: { ...StyleSheet.absoluteFillObject, flex: 1 },
});
