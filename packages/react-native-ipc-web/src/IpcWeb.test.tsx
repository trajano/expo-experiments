import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from 'react-native';
import { IpcWebContext, IpcWebProvider } from './IpcWeb';
import { simpleEchoServer } from './simpleEchoServer';

describe('IpcWeb', () => {
  it('Use context', async () => {
    const onMessage = jest.fn();
    render(
      <IpcWebProvider sourceProvider={simpleEchoServer} onMessage={onMessage}>
        <IpcWebContext.Consumer>
          {({ IpcWebView, postMessage }) => {
            return (
              <>
                <IpcWebView />
                <Button
                  onPress={() => postMessage({ input: 'foo' })}
                  title="send"
                />
              </>
            );
          }}
        </IpcWebContext.Consumer>
      </IpcWebProvider>,
    );
    await act(() => Promise.resolve());
    fireEvent.press(screen.getByText('send'));
  });
});
