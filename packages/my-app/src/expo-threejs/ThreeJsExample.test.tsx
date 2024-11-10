import { act, render, screen } from '@testing-library/react-native';
import { ThreeJsExample } from './ThreeJsExample';
import { composeStories } from '@storybook/react';
import * as stories from './ThreeJsExample.stories';

const { WebglAnimationMultiple } = composeStories(stories);
describe('ThreeJsExample', () => {
  it('renders ThreeJsExample with correct source', async () => {
    render(<ThreeJsExample exampleName="webgl_animation_skinning_ik" />);
    await act(() => Promise.resolve());
    const webView = screen.getByTestId('webview');
    expect(webView).toBeTruthy();
    expect(webView.props.source).toEqual({
      uri: 'https://threejs.org/examples/webgl_animation_skinning_ik.html',
    });
  });
  it('renders ThreeJsExample story', async () => {
    render(<WebglAnimationMultiple />);
    await act(() => Promise.resolve());
    expect(screen.getByTestId('webview')).toBeTruthy();
    expect(screen.getByTestId('webview').props).toHaveProperty('source', {
      uri: 'https://threejs.org/examples/webgl_animation_multiple.html',
    });
  });
});
