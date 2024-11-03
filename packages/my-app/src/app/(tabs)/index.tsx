import { VibrateButton } from '@/components/VibrateButton';
import { useRouter } from 'expo-router';
import { FC, useCallback, useReducer } from 'react';
import {
  Button,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  HelloWave,
  ParallaxScrollView,
  ThemedText,
  ThemedView,
} from 'react-native-my-components';
import { useClockState, useNotifications } from 'react-native-my-hooks';
import { MyText, Strong } from 'react-native-my-text';
import { sharePushCurlCommandAsync } from '@/notifications';
import { DevMenu } from 'expo-dev-client';

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

  const onShareCurlCommand = useCallback(() => {
    (async () => sharePushCurlCommandAsync(expoPushToken!))();
  }, [expoPushToken]);

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
          Bon jour on {formattedTime} !
          <Strong testID="press-count">{pressCount}</Strong>
        </MyText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button
          title="go load"
          testID="go-load-button"
          onPress={() => {
            incrementPressCount();
            router.back();
          }}
        />

        <Button
          title="go storybook"
          testID="go-storybook-button"
          onPress={() => {
            incrementPressCount();
            router.push('/storybook');
          }}
        />

        <Button
          title="Open dev menu"
          testID="open-dev-menu"
          onPress={() => {
            if (__DEV__) {
              DevMenu.openMenu();
            }
          }}
          disabled={!__DEV__}
        />
        <Button
          title="share curl command"
          testID="share-curl-command-button"
          disabled={!expoPushToken}
          onPress={onShareCurlCommand}
        />

        <Button
          title="log something"
          testID="log-something-button"
          onPress={() => {
            console.error('error log');
          }}
        />

        <Button
          title="go sitemap"
          testID="go-sitemap-button"
          onPress={() => {
            incrementPressCount();
            router.push('/_sitemap');
          }}
        />

        <TouchableOpacity
          testID="open-settings-button"
          onPress={() => Linking.openSettings()}
        >
          <ThemedText type="subtitle">Open Settings</ThemedText>
        </TouchableOpacity>

        <ThemedText type="subtitle" testID="expo-push-token">
          {JSON.stringify(expoPushToken?.data, null, 2)}
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

        <ThemedText>
          The following only makes sense on Android devices as iOS does not
          recognize the patterns.
        </ThemedText>
        <VibrateButton
          title="Shave and a Haircut"
          pattern={[
            0, // no gap
            200, // shave
            400,
            100, // and
            100,
            100, // a
            200,
            400, // hair
            200,
            300, // cut
            1000, // long pause
            400, // two
            200,
            400, // bits
          ]}
        />
        <VibrateButton
          title="Super Mario Bros."
          pattern={[
            0,
            100, // dun
            200,
            100, // dun
            200,
            100, // dun
            300,
            100, // dun
            100,
            100, // dun
            100,
            150, // dun
            400,
            300, //dun
          ]}
        />
        <VibrateButton
          title="Peppa Pig"
          pattern={[
            0,
            300, // dun
            100,
            100, // dah
            100,
            100, // dah
            100,
            400, // daaah
            100,
            200, // daah
            200,
            400, // don
            200,
            100, // dah
            100,
            100, // dah
            100,
            100, // dah
            100,
            500, // dah
          ]}
        />
        <VibrateButton
          title="Dramatic Chipmunk"
          pattern={[
            0,
            500, // dun
            200,
            400, // dun
            300,
            1000, // DUUN
          ]}
        />
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
