import { act, render, screen } from '@testing-library/react-native';
import { ReadyPlayerMeDance } from './ReadyPlayerMeDance';
import { composeStories } from '@storybook/react';
import * as stories from './ReadyPlayerMeDance.stories';

jest.mock('react-native-webview', () => {
  return {
    WebView: jest.fn((props) => <div role="role" {...props} />),
  };
});
const { ThreeJsReadyPlayerMeSample } = composeStories(stories);
describe('ThreeJsExample', () => {
  it('renders ReadyPlayerMeDance with correct source', async () => {
    render(
      <ReadyPlayerMeDance
        testID="webview"
        modelUri="https://threejs.org/examples/models/gltf/readyplayer.me.glb"
        fbxAnimationUri="https://threejs.org/examples/models/fbx/mixamo.fbx"
        useLocalUri={false}
      />,
    );
    await act(() => Promise.resolve());
    const webView = screen.getByTestId('webview');
    expect(webView).toBeTruthy();
  });
  it('renders ThreeJsExample story', async () => {
    render(<ThreeJsReadyPlayerMeSample />);
    await act(() => Promise.resolve());
    const webView = screen.getByTestId('webview');
    expect(webView).toBeTruthy();
  });
});
