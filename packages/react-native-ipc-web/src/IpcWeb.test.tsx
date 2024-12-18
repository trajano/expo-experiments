import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from 'react-native';
import { IpcWebConsumer, IpcWebProvider, useIpcWeb, WithIpcWeb } from './index';
import { simpleEchoServer } from './simpleEchoServer';

describe('IpcWeb', () => {
  it('Use context', async () => {
    const onMessage = jest.fn();
    render(
      <IpcWebProvider sourceProvider={simpleEchoServer} onMessage={onMessage}>
        <IpcWebConsumer>
          {({ IpcWebView, postMessage }) => {
            return (
              <>
                <IpcWebView />
                <Button
                  onPress={() => postMessage({ input: 'foo', for: 'xyz' })}
                  title="send"
                />
              </>
            );
          }}
        </IpcWebConsumer>
      </IpcWebProvider>,
    );
    await act(() => Promise.resolve());
    fireEvent.press(screen.getByText('send'));
  }, 30_000);

  it('Use HoC', async () => {
    const onMessage = jest.fn();
    const TestComponent = () => {
      const { IpcWebView, postMessage } = useIpcWeb();
      return (
        <>
          <IpcWebView />
          <Button
            onPress={() => postMessage({ input: 'foo', for: 'xyz' })}
            title="send"
          />
        </>
      );
    };
    const CompositeComponent = WithIpcWeb(TestComponent);

    render(
      <CompositeComponent
        sourceProvider={simpleEchoServer}
        onMessage={onMessage}
      />,
    );
    await act(() => Promise.resolve());
    fireEvent.press(screen.getByText('send'));
  }, 30_000);
});
