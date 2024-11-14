import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevMenuItemModule } from '@/devmenu/types';

export default {
  name: 'Clear AsyncStorage',
  callback: async () => {
    await AsyncStorage.clear();
  },
} satisfies DevMenuItemModule;
