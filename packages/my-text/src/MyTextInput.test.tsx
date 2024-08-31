import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { MyText } from './MyText';
import { MyTextInput } from './MyTextInput';

describe('MyTextE', () => {
  it('should render with embedded font family styles on iOS', () => {
    const { getByTestId, toJSON } = render(
      <>
        <MyText style={{ color: 'white' }}>
          <MyText>Email:</MyText>
        </MyText>
        <MyTextInput testID="input" style={styles.input} />
      </>,
    );

    const inputField = getByTestId('input');

    expect(inputField).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
