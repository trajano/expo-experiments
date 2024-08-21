import { render } from '@testing-library/react-native';
import { MyText } from './MyText'; // Adjust the import path as necessary
describe('MyText component', () => {
  it('should apply the correct Google Font key based on fontFamily, fontWeight, and fontStyle', () => {
    const { getByText } = render(
      <MyText
        style={{
          fontFamily: 'Nunito',
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}
      >
        Test Text
      </MyText>,
    );

    const textElement = getByText('Test Text');

    expect(textElement.props.style.fontFamily).toBe('Nunito_700Bold_Italic');
    expect(textElement.props.style.fontStyle).toBeUndefined();
    expect(textElement.props.style.fontWeight).toBeUndefined();
  });

  it('should fallback to the original values if Google Font key mapping fails', () => {
    const { getByText } = render(
      <MyText style={{ fontWeight: '500', fontStyle: 'italic' }}>
        Test Text
      </MyText>,
    );

    const textElement = getByText('Test Text');

    expect(textElement.props.style.fontFamily).toBeFalsy();
    expect(textElement.props.style.fontStyle).toBe('italic');
    expect(textElement.props.style.fontWeight).toBe('500');
  });

  it('should inherit font styles from the parent MyText component', () => {
    const { getByText } = render(
      <MyText style={{ fontFamily: 'Nunito', fontWeight: '300' }}>
        <MyText>Child Text</MyText>
      </MyText>,
    );

    const textElement = getByText('Child Text');

    expect(textElement.props.style.fontFamily).toBe('Nunito_300Light');
    expect(textElement.props.style.fontStyle).toBeUndefined();
    expect(textElement.props.style.fontWeight).toBeUndefined();
  });

  it('should override inherited font styles if explicitly provided', () => {
    const { getByText } = render(
      <MyText style={{ fontFamily: 'Nunito', fontWeight: '300' }}>
        <MyText style={{ fontWeight: 'bold' }}>Child Text</MyText>
      </MyText>,
    );

    const textElement = getByText('Child Text');

    expect(textElement.props.style.fontFamily).toBe('Nunito_700Bold');
    expect(textElement.props.style.fontStyle).toBeUndefined();
    expect(textElement.props.style.fontWeight).toBeUndefined();
  });

  it('should override inherited font styles if explicitly provided to remove italic', () => {
    const { getByText } = render(
      <MyText style={{ fontFamily: 'Nunito', fontStyle: 'italic' }}>
        <MyText style={{ fontStyle: 'normal' }}>Child Text</MyText>
      </MyText>,
    );

    const textElement = getByText('Child Text');

    expect(textElement.props.style.fontFamily).toBe('Nunito_400Regular'); // Expect 'Nunito_400Regular' because no fontWeight was specified
    expect(textElement.props.style.fontStyle).toBeUndefined(); // fontStyle should be undefined since it's handled by the fontFamily
    expect(textElement.props.style.fontWeight).toBeUndefined(); // fontWeight should also be undefined
  });
  it('should preserve the fontVariant small-caps style', () => {
    const { getByText } = render(
      <MyText
        style={{ fontFamily: 'SourceSansPro', fontVariant: ['small-caps'] }}
      >
        Small Caps Text
      </MyText>,
    );

    const textElement = getByText('Small Caps Text');

    expect(textElement.props.style.fontVariant).toContain('small-caps');
    expect(textElement.props.style.fontFamily).toBe('SourceSansPro_400Regular');
    expect(textElement.props.style.fontWeight).toBeUndefined(); // fontWeight should be undefined since it's handled by the fontFamily
    expect(textElement.props.style.fontStyle).toBeUndefined(); // fontStyle should be undefined since it's handled by the fontFamily
  });

  it('should preserve the correct styles across three levels of nesting with SourceSansPro, even with random inner styles', () => {
    const { getByText } = render(
      <MyText
        style={{
          fontFamily: 'SourceSansPro',
          fontWeight: '600',
          fontStyle: 'italic',
          fontVariant: ['small-caps'],
        }}
      >
        <MyText style={{ fontStyle: 'normal' }}>
          <MyText style={{ fontWeight: 'bold' }}>Nested Text</MyText>
        </MyText>
      </MyText>,
    );

    const textElement = getByText('Nested Text');

    expect(textElement.props.style.fontVariant).toBeUndefined(); // it should be undefined because font variant isn't being managed.
    expect(textElement.props.style.fontFamily).toBe('SourceSansPro_700Bold');
    expect(textElement.props.style.fontWeight).toBeUndefined(); // fontWeight should be undefined since it's handled by the fontFamily
    expect(textElement.props.style.fontStyle).toBeUndefined(); // fontStyle should be undefined since it's handled by the fontFamily
  });

  it('should preserve the correct styles specifically the variants across three levels of nesting with SourceSansPro, even with random inner styles', () => {
    const { getByText } = render(
      <MyText
        style={{
          fontFamily: 'SourceSansPro',
          fontWeight: '600',
          fontStyle: 'italic',
          fontVariant: ['small-caps'],
        }}
      >
        <MyText style={{ fontStyle: 'normal' }}>
          <MyText
            style={{ fontWeight: 'bold', fontVariant: ['common-ligatures'] }}
          >
            Nested Text
          </MyText>
        </MyText>
      </MyText>,
    );

    const textElement = getByText('Nested Text');

    expect(textElement.props.style.fontVariant).toContain('common-ligatures');
    expect(textElement.props.style.fontFamily).toBe('SourceSansPro_700Bold');
    expect(textElement.props.style.fontWeight).toBeUndefined(); // fontWeight should be undefined since it's handled by the fontFamily
    expect(textElement.props.style.fontStyle).toBeUndefined(); // fontStyle should be undefined since it's handled by the fontFamily
  });

  it('should correctly apply styles to each text segment with nested MyText elements and different font families', () => {
    const { getByText, toJSON } = render(
      <MyText
        style={{
          fontFamily: 'SourceSansPro',
          fontWeight: '600',
          fontStyle: 'italic',
          fontVariant: ['small-caps'],
        }}
      >
        foo
        <MyText style={{ fontFamily: 'Nunito', fontStyle: 'normal' }}>
          bar
          <MyText style={{ fontFamily: 'SourceSansPro', fontWeight: 'bold' }}>
            baz
          </MyText>
          mew
        </MyText>
      </MyText>,
    );

    // Validate styles for the full text 'foobarbazmew'
    const foobarbazmew = getByText('foobarbazmew');

    // Validate styles for 'foo'
    expect(foobarbazmew.props.style.fontVariant).toContain('small-caps');
    expect(foobarbazmew.props.style.fontFamily).toBe(
      'SourceSansPro_600SemiBold_Italic',
    );
    expect(foobarbazmew.props.style.fontWeight).toBeUndefined();
    expect(foobarbazmew.props.style.fontStyle).toBeUndefined();

    const barbazmew = getByText('barbazmew');
    // Validate styles for 'bar'
    expect(barbazmew.props.style.fontVariant).toBeUndefined(); // No small-caps in 'bar' text
    expect(barbazmew.props.style.fontFamily).toBe('Nunito_600SemiBold');
    expect(barbazmew.props.style.fontWeight).toBeUndefined();
    expect(barbazmew.props.style.fontStyle).toBeUndefined();

    const baz = getByText('baz');
    // Validate styles for 'baz'
    expect(baz.props.style.fontVariant).toBeUndefined(); // No small-caps in 'baz' text
    expect(baz.props.style.fontFamily).toBe('SourceSansPro_700Bold');
    expect(baz.props.style.fontWeight).toBeUndefined();
    expect(baz.props.style.fontStyle).toBeUndefined();

    expect(toJSON()).toMatchSnapshot();

  });
});
