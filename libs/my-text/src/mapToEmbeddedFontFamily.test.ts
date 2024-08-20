import {
  mapToPostScriptName,
  mapToEmbeddedFontFamily,
} from './mapToGoogleFontKey';
import { Platform } from 'react-native';

describe('mapToEmbeddedFontFamily', () => {
  it('should map 400 normal font to Regular', () => {
    const fontFamily = 'Inter';
    const fontWeight = '400';
    const fontStyle = 'normal';

    const result = mapToPostScriptName(fontFamily, fontWeight, fontStyle);

    expect(result).toBe('Inter-Regular');
  });

  it('should map 400 italic font to Italic', () => {
    const fontFamily = 'Inter';
    const fontWeight = '400';
    const fontStyle = 'italic';

    const result = mapToPostScriptName(fontFamily, fontWeight, fontStyle);

    expect(result).toBe('Inter-Italic');
  });
});

describe('mapToEmbeddedFontFamily', () => {
  beforeEach(() => {
    jest.resetModules(); // Resets any previous mocks
  });

  it('should return undefined if fontFamily is not provided', () => {
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.ios);

    const result = mapToEmbeddedFontFamily(undefined, '400', 'normal');

    expect(result).toBeUndefined();
  });
  
  it('should map to the correct PostScript name for iOS', () => {
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.ios);

    const fontFamily = 'Inter';
    const fontWeight = '400';
    const fontStyle = 'normal';

    const result = mapToEmbeddedFontFamily(fontFamily, fontWeight, fontStyle);

    expect(result).toBe('Inter-Regular');
  });

  it('should map to the correct PostScript name for iOS with italic', () => {
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.ios);

    const fontFamily = 'Inter';
    const fontWeight = '400';
    const fontStyle = 'italic';

    const result = mapToEmbeddedFontFamily(fontFamily, fontWeight, fontStyle);

    expect(result).toBe('Inter-Italic');
  });

  it('should map to the correct Google Font key for non-iOS platforms', () => {
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.default);

    const fontFamily = 'Inter';
    const fontWeight = '400';
    const fontStyle = 'normal';

    const result = mapToEmbeddedFontFamily(fontFamily, fontWeight, fontStyle);

    expect(result).toBe('Inter_400Regular');
  });

  it('should map to the correct Google Font key for non-iOS platforms with italic', () => {
    jest.spyOn(Platform, 'select').mockImplementation((obj) => obj.default);

    const fontFamily = 'Inter';
    const fontWeight = '400';
    const fontStyle = 'italic';

    const result = mapToEmbeddedFontFamily(fontFamily, fontWeight, fontStyle);

    expect(result).toBe('Inter_400Regular_Italic');
  });
});
