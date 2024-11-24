type StartedMessage = {
  event: 'started';
};
type MessageEvent = {
  event: 'message';
  fromServer: string;
};
export type SimpleEchoServerMessage = StartedMessage | MessageEvent;

/**
 * This expects data to be of the form `{"input": string}`
 */
export const simpleEchoServer = async () => {
  return `
<!DOCTYPE html>
<html>
<body>
<script>
  window.addEventListener('message', (message) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ fromServer: JSON.parse(message.data).input, event:"message" }));
  });
  window.ReactNativeWebView.postMessage(JSON.stringify({ event: "started" }));
</script>
</body>
</html>
`;
};
