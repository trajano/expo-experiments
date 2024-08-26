import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDebounceState } from 'react-native-my-hooks';
import { MyText, MyTextInput } from 'react-native-my-text';

export const DebouncedTextInput: FC = () => {
  // Using useDebounceState hook to manage the debounced state
  const [inputValue, setInputValue] = useDebounceState<string>('', {
    debounceTimeout: 300, // Debounce after 300ms
    maxWaitTimeout: 1000, // Maximum wait of 1000ms
  });

  return (
    <View style={styles.container}>
      <MyTextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setInputValue} // Directly setting the debounced state
      />

      <MyText style={styles.text}>Debounced Value: {inputValue}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    fontFamily: 'ComicNeue',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: 18,
    color: 'white',
  },
});

export default DebouncedTextInput;
