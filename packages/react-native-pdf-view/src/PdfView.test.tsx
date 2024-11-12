import { act, render, screen } from '@testing-library/react-native';
import 'jest-extended';
import { PdfView } from './PdfView';
import { composeStories } from '@storybook/react';
import * as stories from './PdfView.stories';
import * as FileSystem from 'expo-file-system';

jest.mock('expo-file-system');

const { MyResume } = composeStories(stories);
describe('PdfView', () => {
  it('renders a file URI', async () => {
    jest.mocked(FileSystem.readAsStringAsync).mockResolvedValue('AAAAA');
    jest.mocked(FileSystem.downloadAsync).mockResolvedValue({
      status: 200,uri:"a", headers: {}, mimeType: ""
    });

    render(
      <PdfView uri="file:///trajano.net/assets/Archimedes%20Trajano.pdf" />,
    );
    await act(()=>Promise.resolve());
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('renders MyResume story', async () => {
    jest.mocked(FileSystem.downloadAsync).mockResolvedValueOnce({
      status: 200,uri:"a", headers: {}, mimeType: ""
    });
    jest.mocked(FileSystem.readAsStringAsync).mockResolvedValueOnce('AAAAA');
    render(<MyResume />);
    await act(()=>Promise.resolve());
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
