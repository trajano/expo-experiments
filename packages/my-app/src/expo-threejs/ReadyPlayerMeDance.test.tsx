import { act, render, screen } from '@testing-library/react-native';
import { ReadyPlayerMeDance } from './ReadyPlayerMeDance';
import { composeStories } from '@storybook/react';
import * as stories from './ReadyPlayerMeDance.stories';
import * as FileSystem from 'expo-file-system';

// jest.mock('react-native-webview', () => {
//   return {
//     WebView: jest.fn((props) => forwardRef((_props, ref)=><div role="role" ref={ref} {...props} />)),
//   };
// });
jest.mock('expo-file-system', () => ({
  ...jest.requireActual('expo-file-system'),
  downloadAsync: jest.fn(() => ({
    status: 200,
  })),
  readAsStringAsync: jest.fn(() => {}),
}));
jest.mock('@/assets/animations/Breakdance-Footwork-1.fbx', () => jest.fn());
jest.mock('@/assets/animations/Hip-Hop-Dancing.fbx', () => jest.fn());
jest.mock('@/assets/animations/Rumba-Dancing.fbx', () => jest.fn());
jest.mock('@/assets/animations/Talking-On-Phone.fbx', () => jest.fn());

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
    jest.mocked(FileSystem.readAsStringAsync).mockResolvedValueOnce('AAAAA');
    render(<ThreeJsReadyPlayerMeSample />);
    await act(() => Promise.resolve());
    const webView = screen.getByTestId('webview');
    expect(webView).toBeTruthy();
  });
});
