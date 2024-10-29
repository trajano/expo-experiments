import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const curlCommand = (expoPushToken: Notifications.ExpoPushToken) => {
  if (Platform.OS === 'ios') {
    return `
    curl -X POST https://exp.host/--/api/v2/push/send \\
      -H "Content-Type: application/json" \\
      -H "Accept: application/json" \\
      -d '{
        "to": "${expoPushToken.data}",
        "title": "Hello!",
        "body": "This is a test notification",
        "data": {"extraData": "Some extra data"}
      }'

    curl -X POST https://exp.host/--/api/v2/push/send \\
      -H "Content-Type: application/json" \\
      -H "Accept: application/json" \\
      -d '{
        "to": "${expoPushToken.data}",
        "_contentAvailable": true,
        "data": {"extraData": "Some extra data"}
      }'
  `;
  } else {
    return `
    curl -X POST https://exp.host/--/api/v2/push/send \\
      -H "Content-Type: application/json" \\
      -H "Accept: application/json" \\
      -d '{
        "to": "${expoPushToken?.data}",
        "title": "Hello!",
        "body": "This is a test notification",
        "data": {"extraData": "Some extra data"}
      }'

    curl -X POST https://exp.host/--/api/v2/push/send \\
      -H "Content-Type: application/json" \\
      -H "Accept: application/json" \\
      -d '{
        "to": "${expoPushToken?.data}",
        "data": {"extraData": "Some extra data"}
      }'
  `;
  }
};
export const sharePushCurlCommand = (
  expoPushToken: Notifications.ExpoPushToken,
) => {
  const platformSpecificCurlCommand = curlCommand(expoPushToken);
  const uri = FileSystem.documentDirectory + `push-${Platform.OS}.txt`;
  (async () => {
    await FileSystem.writeAsStringAsync(uri, platformSpecificCurlCommand, {
      encoding: 'utf8',
    });
    await Sharing.shareAsync(uri, {
      dialogTitle: 'Share the CURL Command',
      mimeType: 'text/plain',
      UTI: 'public.plain-text',
    });
  })();
};
