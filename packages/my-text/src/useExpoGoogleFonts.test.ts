import { renderHook } from '@testing-library/react-native';
import { useFonts } from 'expo-font';
import { useExpoGoogleFonts } from './useExpoGoogleFonts';

jest.mock('expo-font', () => ({
  useFonts: jest.fn(),
}));

describe('useExpoGoogleFonts', () => {
  it('should call useFonts with the correct map of fonts', () => {
    const mockUseFonts = useFonts as jest.MockedFunction<typeof useFonts>;
    const mockMap = {
      fontA: 'fontA-source',
      fontB: 'fontB-source',
      __metadata__: 'metadata',
    };

    mockUseFonts.mockReturnValue([true, null]);

    const { result } = renderHook(() => useExpoGoogleFonts(mockMap));

    expect(mockUseFonts).toHaveBeenCalledWith({
      fontA: 'fontA-source',
      fontB: 'fontB-source',
    });
    expect(result.current).toEqual([true, null]);
  });
});
