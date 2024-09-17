import { act, renderHook } from '@testing-library/react-native';
import { loadAsync, useFonts } from 'expo-font';
import { useExpoGoogleFonts } from './useExpoGoogleFonts';

jest.mock('expo-font', () => ({
  useFonts: jest.fn(),
  loadAsync: jest.fn(),
}));

describe('useExpoGoogleFonts', () => {
  it('should call useFonts with the correct map of fonts', async () => {
    const mockUseFonts = useFonts as jest.MockedFunction<typeof useFonts>;
    const mockLoadAsync = loadAsync as jest.MockedFunction<typeof loadAsync>;
    const mockMap = {
      fontA: 'fontA-source',
      fontB: 'fontB-source',
      __metadata__: 'metadata',
    };

    mockUseFonts.mockReturnValue([true, null]);

    const { result } = renderHook(() => useExpoGoogleFonts(mockMap));

    await act(() => Promise.resolve());
    expect(mockLoadAsync).toHaveBeenCalledWith({
      fontA: 'fontA-source',
      fontB: 'fontB-source',
    });
    expect(result.current).toEqual([true, null]);
  });
});
