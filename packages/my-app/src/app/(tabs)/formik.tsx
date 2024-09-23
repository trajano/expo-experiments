import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MyText, MyTextInput } from 'react-native-my-text';
import { ParallaxScrollView, ThemedView } from 'react-native-my-components';
import * as Yup from 'yup';
type FormValues = {
  email: string;
  message: string;
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  message: Yup.string().required('Message is required'),
});
const globalErrorUtils = global.ErrorUtils;
const FormikScreen: FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const errorUtilInfo = `${globalErrorUtils} really? o=${!!globalErrorUtils} gf=${!!globalErrorUtils.getGlobalHandler}  gh=${!!globalErrorUtils.getGlobalHandler()} sg=${!!globalErrorUtils.setGlobalHandler}`;
  useEffect(() => {
    register('email');
    register('message');
  }, [register]);
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('https://trajano.net/httpbin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(JSON.stringify(result, null, 2)); // Display the response in an alert
      reset(); // Reset the form after submission
    } catch (error: unknown) {
      alert('Error submitting form');
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.inputContainer}>
        <MyText style={{ color: 'white' }}>Email:</MyText>
        <MyTextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setValue('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </ThemedView>
      <ThemedView style={styles.textAreaContainer}>
        <MyText style={{ color: 'white' }}>Message:</MyText>
        <MyTextInput
          style={styles.textarea}
          placeholder="Type your message here"
          onChangeText={(text) => setValue('message', text)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <MyText style={{ color: 'white' }}>{errorUtilInfo}</MyText>
      </ThemedView>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    color: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  textAreaContainer: {
    flex: 1,
    marginBottom: 15,
  },
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderRadius: 5,
    height: 100,
    marginTop: 5,
    textAlignVertical: 'top',
  },
});

export default FormikScreen;
