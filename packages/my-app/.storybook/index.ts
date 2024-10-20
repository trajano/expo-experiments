import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { view } from './storybook.requires';
export { PreviewViewMode } from './preview';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  theme: {
    brand: {
      title: Constants.expoConfig?.name,
      url: 'https://trajano.net',
      imageSource: require('@/assets/images/favicon.png'),
    } as any,
  },
});

export default StorybookUIRoot;
