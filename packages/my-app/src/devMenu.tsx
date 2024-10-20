import { Alert, DevSettings } from 'react-native';

if (__DEV__) {
  DevSettings.addMenuItem('Show Secret Dev Screen', () => {
    Alert.alert('Showing secret dev screen!');
  });
}
