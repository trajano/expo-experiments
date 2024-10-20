import { render } from '@testing-library/react-native';
import { createRef } from 'react';
import { Text, TextInput } from 'react-native';
import { mapToEmbeddedFontFamily } from './mapToEmbeddedFontFamily';
import { MyText, Strong, Em, MyTextInput } from './embedded';

describe('MyText via embedded', () => {
  it('should render with embedded font family styles on iOS', () => {
    const { getByText, toJSON } = render(
      <MyText style={{ fontSize: 16 }}>Test Text</MyText>,
    );

    const renderedText = getByText('Test Text');

    // The `mapToEmbeddedFontFamily` is expected to map the font family correctly.
    expect(renderedText.props.style).toMatchObject({
      fontFamily: mapToEmbeddedFontFamily(undefined, undefined, undefined), // Assuming default values are passed
      fontSize: 16,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should handle variants', () => {
    const { getByText, toJSON } = render(
      <MyText style={{ fontSize: 16 }}>
        <Strong>
          <Em>Test Text</Em>
        </Strong>
      </MyText>,
    );

    const renderedText = getByText('Test Text');

    // The `mapToEmbeddedFontFamily` is expected to map the font family correctly.
    // font size is not transfered because it is not managed by MyText
    expect(renderedText.props.style).toMatchObject({
      fontFamily: mapToEmbeddedFontFamily(undefined, undefined, undefined), // Assuming default values are passed
      fontWeight: 'bold',
      fontStyle: 'italic',
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should forward the ref to the underlying Text component', () => {
    const ref = createRef<Text>();

    const { getByText } = render(<MyText ref={ref}>Test Text</MyText>);

    const renderedText = getByText('Test Text');

    // Ensure that the ref is correctly assigned to the underlying Text component
    expect(ref.current).toBeInstanceOf(Text);
    expect(ref.current.props).toEqual(renderedText.props);
  });

  it('should forward the ref to the underlying Text component', () => {
    const ref = createRef<TextInput>();

    const { getByTestId } = render(<MyTextInput testID="input" ref={ref} />);

    const inputField = getByTestId('input');

    // Ensure that the ref is correctly assigned to the underlying Text component
    expect(ref.current).toBeInstanceOf(TextInput);
    expect(ref.current.props).toEqual(inputField.props);
  });
});
