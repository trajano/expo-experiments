import { act, render, screen } from '@testing-library/react-native';
import { ReadyPlayerMeDance } from './ReadyPlayerMeDance';
import { composeStories } from '@storybook/react';
import * as stories from './ReadyPlayerMeDance.stories';
import * as FileSystem from 'expo-file-system';

jest.mock('expo-file-system', () => ({
  ...jest.requireActual('expo-file-system'),
  downloadAsync: jest.fn(() => ({
    status: 200,
  })),
  readAsStringAsync: jest.fn(() => {}),
}));
jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: () => {
      return [
        {
          localUri: 'Foo/Bar/file.txt',
        },
      ];
    },
  },
}));

const { ThreeJsReadyPlayerMeSample } = composeStories(stories);
describe('ThreeJsExample', () => {
  it('renders ReadyPlayerMeDance with correct source', async () => {
    render(
      <ReadyPlayerMeDance
        testID="webview"
        modelUri="https://threejs.org/examples/models/gltf/readyplayer.me.glb"
        fbxAnimationUri="https://threejs.org/examples/models/fbx/mixamo.fbx"
      />,
    );
    await act(() => Promise.resolve());
    const webView = screen.getByTestId('webview');
    expect(webView).toBeTruthy();
    expect(FileSystem.downloadAsync).toBeCalledWith(
      'https://threejs.org/build/three.webgpu.js',
      'Foo/Bar/three.webgpu.js',
      { cache: true },
    );
  });
  it('renders ThreeJsExample story', async () => {
    jest.mocked(FileSystem.readAsStringAsync).mockResolvedValueOnce('AAAAA');
    render(<ThreeJsReadyPlayerMeSample />);
    await act(() => Promise.resolve());
    const webView = screen.getByTestId('webview');
    expect(webView).toBeTruthy();
  });
});
