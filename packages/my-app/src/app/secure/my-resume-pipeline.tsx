import { PdfPipelineView } from 'react-native-pdf-view';
import { FC, useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import samples from '@/data/samplePdfUrls.json';
import {
  usePdfPipeline,
  WithPdfView,
} from 'react-native-pdf-view/src/PdfPipeline';
import * as Crypto from 'expo-crypto';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import { useViewDimensions } from '@/hooks/useViewDimensions';

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
  }, [loadedUri]);
  const router = useRouter();
  console.debug({ uri, pageCount, dimensions });
  const pageNumber = 1;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PdfPipelineView
        style={[styles.pdf, dimensions]}
        uri={uri}
        pageNumber={pageNumber}
        onPageCountKnown={(e) => {
          console.info(e);
          if (pageNumber === 1) {
            setPageCount(e.pageCount);
          }
        }}
        onViewPortKnown={(e) => {
          setWidth(e.width);
          setHeight(e.height);
        }}
        onError={(e) => {
          console.error(e);
        }}
        onLoad={() => {
          setLoadedUri(uri);
          setLoading(false);
        }}
      />
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
/*
    //   <PagerView style={styles.pager}>
    //     {Array.from({ length: pageCount }, (_ignore, index) => index + 1).map(
    //       (pageNumber) => (
    //         <View key={`${uri}.${pageNumber}`}>


            </View>
          ),
        )}
      </PagerView>

 */
const CompositeScreen = WithPdfView(ResumeScreen);
export default CompositeScreen;

const styles = StyleSheet.create({
  container: {},
  pager: { flex: 1 },
  pdf: { backgroundColor: 'red' },
});
