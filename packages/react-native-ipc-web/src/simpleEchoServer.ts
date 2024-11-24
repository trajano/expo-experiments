type StartedMessage = {
  event: 'started';
};
type MessageEvent = {
  event: 'message';
  fromServer: string;
  for: string;
};
export type Request = {
  input: string;
  for: string;
};
export type SimpleEchoServerMessage = StartedMessage | MessageEvent;

/**
 * This expects data to be of the form `{"input": string, "for": string}`
 */
export const simpleEchoServer = async () => {
  return `
<!DOCTYPE html>
<html>
<body>
<script>
  window.addEventListener('message', (message) => {
    /** @type {import("simpleEchoServer").Request} */
    const parsed = JSON.parse(message.data);
    window.ReactNativeWebView.postMessage(JSON.stringify({ fromServer: parsed.input, event:"message", for: parsed.for }));
  });
  window.ReactNativeWebView.postMessage(JSON.stringify({ event: "started" }));
</script>
</body>
</html>
`;
};
