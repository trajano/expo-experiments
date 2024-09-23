import { Button, Image, Platform, StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';
import { FC, useReducer } from 'react';
import {
  HelloWave,
  ParallaxScrollView,
  ThemedText,
  ThemedView,
} from 'react-native-my-components';
import { useClockState, useNotifications } from 'react-native-my-hooks';
import { MyText } from 'react-native-my-text';

const formatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true, // Optional: Use `false` for 24-hour format
});
const HomeScreen: FC = () => {
  const clock = useClockState();
  const router = useRouter();
  const formattedTime = formatter.format(clock);
  const [pressCount, incrementPressCount] = useReducer((i) => i + 1, 0);

  const { expoPushToken, permissionStatus } = useNotifications();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <MyText style={{ fontSize: 30, fontWeight: 'black', color: 'white' }}>
          Bon jour on {formattedTime} ! {pressCount}
        </MyText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button
          title="go load"
          onPress={() => {
            incrementPressCount();
            router.back();
          }}
        />

        <Button
          title="go storybook"
          onPress={() => {
            incrementPressCount();
            router.push('/storybook');
          }}
        />

        <ThemedText type="subtitle">
          {JSON.stringify(expoPushToken, null, 2)}
        </ThemedText>
        <ThemedText>
          permissionStatus = {permissionStatus}
          <ThemedText type="defaultSemiBold">
            app/(tabs)/index.tsx
          </ThemedText>{' '}
          to see changes. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn{' '}
          <MyText style={{ fontWeight: 'bold' }}>
            more <MyText style={{ fontStyle: 'italic' }}>about</MyText> what's
          </MyText>{' '}
          included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
          directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default HomeScreen;
