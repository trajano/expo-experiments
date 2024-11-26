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
  /**
   * Indicates that input is a URI
   */
  isUri?: boolean;
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
<head>
<title>simpleEchoServer</title>
</head>
<body>
<script>
  window.addEventListener('message', (message) => {
    /** @type {import("simpleEchoServer").Request} */
    const parsed = JSON.parse(message.data);
    if (parsed.isUri) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ fromServer: xhr.responseText, event:"message", for: parsed.for }));
        }
      }
      console.log(parsed.input)
      xhr.open("GET", parsed.input);
      console.log("open")
      xhr.send();
      console.log("send")
    } else {
      window.ReactNativeWebView.postMessage(JSON.stringify({ fromServer: parsed.input, event:"message", for: parsed.for }));
    }
  });
  window.ReactNativeWebView.postMessage(JSON.stringify({ event: "started" }));
</script>
</body>
</html>
`;
};
