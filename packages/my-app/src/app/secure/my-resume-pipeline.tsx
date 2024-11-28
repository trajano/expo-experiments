import { PdfPipelineView } from 'react-native-pdf-view';
import { FC, useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import samples from '@/data/samplePdfUrls.json';
import {
  usePdfPipeline,
  WithPdfView,
} from 'react-native-pdf-view/src/PdfPipeline';
import * as Crypto from 'expo-crypto';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import { useViewDimensions } from 'react-native-my-hooks';
import PagerView from 'react-native-pager-view';
import { MyText } from 'react-native-my-text';

const ResumeScreen: FC = () => {
  const [uri, setUri] = useState(samples[0]);
  const [loadedUri, setLoadedUri] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const { dimensions, setHeight, setWidth } = useViewDimensions();
  const flip = useCallback(() => {
    const randomUri = samples[Crypto.getRandomBytes(1)[0] % samples.length];
    setUri(randomUri);
    setPageCount(1);
    setLoading(true);
  }, []);
  const { postPdfRequest } = usePdfPipeline();
  const post = useCallback(async () => {
    let randomUri = samples[Crypto.getRandomBytes(1)[0] % samples.length];
    while (loadedUri === randomUri) {
      randomUri = samples[Crypto.getRandomBytes(1)[0] % samples.length];
    }
    const localUri = (await Asset.fromURI(randomUri).downloadAsync()).localUri!;
    postPdfRequest('a', localUri);
  }, [loadedUri, postPdfRequest]);
  const router = useRouter();
  console.debug({ uri, pageCount, dimensions });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PagerView
        style={{ backgroundColor: 'yellow', ...dimensions }}
        scrollEnabled={true}
      >
        {Array.from({ length: pageCount }, (_ignore, index) => index + 1).map(
          (pageNumber) => (
            <View
              key={`${pageNumber}`}
              style={{
                backgroundColor: 'purple',
                width: '100%',
                height: '100%',
              }}
            >
              <View style={{ alignSelf: 'center' }}>
                <MyText>{pageNumber}</MyText>
              </View>
              <PdfPipelineView
                style={[styles.pdf, dimensions]}
                uri={uri}
                pageNumber={pageNumber}
                onPageCountKnown={(e) => {
                  if (pageNumber === 1) {
                    setPageCount(e.pageCount);
                  }
                }}
                onViewPortKnown={(e) => {
                  if (pageNumber === 1) {
                    setWidth(e.width);
                    setHeight(e.height);
                  }
                }}
                onError={(e) => {
                  console.error(e);
                }}
                onLoad={() => {
                  setLoadedUri(uri);
                  setLoading(false);
                }}
              />
            </View>
          ),
        )}
      </PagerView>
      <Button title={loadedUri} onPress={flip} disabled={loading} />
      <Button title={uri} onPress={post} />
      <Button
        title="reload"
        onPress={() => {
          router.replace('/secure/my-resume-pipeline');
        }}
      />
    </ScrollView>
  );
};
const CompositeScreen = WithPdfView(ResumeScreen);
export default CompositeScreen;

const styles = StyleSheet.create({
  container: {},
  pager: { flex: 1 },
  pdf: { backgroundColor: 'red' },
});
