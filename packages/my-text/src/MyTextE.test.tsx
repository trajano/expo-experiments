import { render } from '@testing-library/react-native';
import { mapToEmbeddedFontFamily } from './mapToEmbeddedFontFamily';
import { MyTextE } from './MyText';

describe('MyTextE', () => {
  it('should render with embedded font family styles on iOS', () => {
    const { getByText } = render(
      <MyTextE style={{ fontSize: 16 }}>Test Text</MyTextE>,
    );

    const renderedText = getByText('Test Text');

    // The `mapToEmbeddedFontFamily` is expected to map the font family correctly.
    expect(renderedText.props.style).toMatchObject({
      fontFamily: mapToEmbeddedFontFamily(undefined, undefined, undefined), // Assuming default values are passed
      fontSize: 16,
    });
  });
});
