import { FC, useCallback, useReducer, useState } from 'react';
import { Button, View } from 'react-native';
import { MyText, MyTextInput } from 'react-native-my-text';
import {
  simpleEchoServer,
  IpcWebProvider,
  useIpcWeb,
  SimpleEchoServerMessage,
} from '@/components/IpcWeb';

const WebViewCommunicationForm: FC<{
  messages: string[];
}> = ({ messages }) => {
  const { IpcWebView, postMessage } = useIpcWeb();
  const [input, setInput] = useState('test message');
  const onChangeText = useCallback((nextInput: string) => {
    setInput(nextInput);
  }, []);
  const onSendMessage = useCallback(() => {
    postMessage({ input });
  }, [postMessage, input]);
  return (
    <View style={{ backgroundColor: 'silver' }}>
      <IpcWebView />
      <MyText>Data to send to webview</MyText>
      <MyTextInput onChangeText={onChangeText} defaultValue={input} />
      <Button title="Send message to webview" onPress={onSendMessage} />
      <MyText>{JSON.stringify(messages, null, 2)}</MyText>
    </View>
  );
};

const WebViewCommunicationScreen: FC = () => {
  const [messages, pushMessage] = useReducer(
    (prev: string[], current: string) => [current, ...prev],
    [],
  );
  const sourceProvider = simpleEchoServer;
  const onMessage = useCallback((message: SimpleEchoServerMessage) => {
    if (message.event === 'message') {
      pushMessage(message.fromServer);
    }
  }, []);
  return (
    <IpcWebProvider sourceProvider={sourceProvider} onMessage={onMessage}>
      <WebViewCommunicationForm messages={messages} />
    </IpcWebProvider>
  );
};
export default WebViewCommunicationScreen;
