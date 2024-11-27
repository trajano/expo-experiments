import { FC, RefObject, useCallback, useRef, useState } from 'react';
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
  messagesRef: RefObject<string[]>;
}> = ({ messagesRef }) => {
  const [messages, setMessages] = useState<string[]>([]);
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
      postMessage({ input: fileUri, isUri: true });
    })();
  }, [postMessage, input]);
  const onRefresh = useCallback(() => {
    setMessages(messagesRef.current ?? []);
  }, [postMessage, input]);

  return (
    <View style={{ backgroundColor: 'silver' }}>
      <IpcWebView />
      <MyText>Data to send to webview</MyText>
      <MyTextInput onChangeText={onChangeText} defaultValue={input} />
      <Button title="Send message to webview" onPress={onSendMessage} />
      <MyText></MyText>
      <Button title="Send URI message to webview" onPress={onSendUriMessage} />
      <MyText></MyText>
      <Button title="Refresh" onPress={onRefresh} />
      <MyText>{JSON.stringify(messages, null, 2)}</MyText>
    </View>
  );
};

const WebViewCommunicationScreen: FC = () => {
  const messagesRef = useRef<string[]>([]);
  const onMessage = useCallback((message: SimpleEchoServerMessage) => {
    if (message.event === 'message') {
      messagesRef.current = [message.fromServer, ...messagesRef.current];
    }
  }, []);
  return (
    <IpcWebProvider sourceProvider={simpleEchoServer} onMessage={onMessage}>
      <WebViewCommunicationForm messagesRef={messagesRef} />
    </IpcWebProvider>
  );
};
export default WebViewCommunicationScreen;
