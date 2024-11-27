import { FC, useCallback, useReducer, useState } from 'react';
import { Button, View } from 'react-native';
import { MyText, MyTextInput } from 'react-native-my-text';
import {
  IpcWebProvider,
  simpleEchoServer,
  SimpleEchoServerMessage,
  useIpcWeb,
} from 'react-native-ipc-web';
import * as FileSystem from 'expo-file-system';

const WebViewCommunicationForm: FC<{
  messages: string[];
}> = ({ messages }) => {
  const { IpcWebView, postMessage } = useIpcWeb();
  const [input, setInput] = useState('test message');
  const onChangeText = useCallback((nextInput: string) => {
    setInput(nextInput);
  }, []);
  const onSendMessage = useCallback(() => {
    console.log('onSend');
    postMessage({ input });
  }, [postMessage, input]);
  const onSendUriMessage = useCallback(() => {
    (async () => {
      const fileUri = FileSystem.cacheDirectory + 'testFile.txt';
      await FileSystem.writeAsStringAsync(fileUri, input, {
        encoding: 'utf8',
      });
      console.log('onSendUri');
      postMessage({ input: fileUri, isUri: true });
    })();
  }, [postMessage, input]);
  return (
    <View style={{ backgroundColor: 'silver' }}>
      <IpcWebView />
      <MyText>Data to send to webview</MyText>
      <MyTextInput onChangeText={onChangeText} defaultValue={input} />
      <Button title="Send message to webview" onPress={onSendMessage} />
      <MyText></MyText>
      <Button title="Send URI message to webview" onPress={onSendUriMessage} />
      <MyText>{JSON.stringify(messages, null, 2)}</MyText>
    </View>
  );
};

const WebViewCommunicationScreen: FC = () => {
  const [messages, pushMessage] = useReducer(
    (prev: string[], current: string) => [current, ...prev],
    [],
  );
  const onMessage = useCallback((message: SimpleEchoServerMessage) => {
    if (message.event === 'message') {
      pushMessage(message.fromServer);
    }
  }, []);
  return (
    <IpcWebProvider sourceProvider={simpleEchoServer} onMessage={onMessage}>
      <WebViewCommunicationForm messages={messages} />
    </IpcWebProvider>
  );
};
export default WebViewCommunicationScreen;
