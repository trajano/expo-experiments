import { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StorybookView from '@sb/index';
const StorybookScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StorybookView testID="storybook-ui" />
    </SafeAreaView>
  );
};
export default StorybookScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
