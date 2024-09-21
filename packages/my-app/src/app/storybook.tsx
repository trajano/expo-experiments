import { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StorybookView from '../../.storybook';
const StorybookScreen: FC<{}> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StorybookView />
    </SafeAreaView>
  );
};
export default StorybookScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
