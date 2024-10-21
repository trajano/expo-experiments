import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';

if (__DEV__) {
  DevSettings.addMenuItem('Clear AsyncStorage and Reload', async () => {
    await AsyncStorage.clear();
    DevSettings.reload();
  });
}
