import { useRouter, useFocusEffect } from 'expo-router';
import * as ComicNeue from '@expo-google-fonts/comic-neue';
import * as Nunito from '@expo-google-fonts/nunito';
import { isDevelopmentBuild } from 'expo-dev-client';
import LottieView from 'lottie-react-native';
import {
  FC,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import * as Updates from 'expo-updates';
import { Animated, Easing, StyleSheet, View } from 'react-native';
// Use MyTextE to ensure the embedded versions of the font are used
import { MyTextE as MyText, useExpoGoogleFonts } from 'react-native-my-text';
import { useFonts } from 'expo-font';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const LoaderScreen: FC = () => {
  const animation = useRef<LottieView>(null);
  const router = useRouter();
  const progress = useRef(new Animated.Value(0)).current; // Animated value to control progress
  const [loadedItems, incrementLoadedItems] = useReducer((i) => i + 1, 0);
  const totalItemsToLoad = 5;
  const [backgroundColor, setBackgroundColor] = useState('#eee');
  const [shown, setShown] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [expoFontsLoaded] = useExpoGoogleFonts(Nunito, ComicNeue);

  useEffect(() => {
    if (loaded) {
      incrementLoadedItems();
    }
  }, [loaded]);
  useEffect(() => {
    if (expoFontsLoaded) {
      incrementLoadedItems();
    }
  }, [expoFontsLoaded]);
  useEffect(() => {
    (async () => {
      incrementLoadedItems();
      if (Updates.isEnabled && !isDevelopmentBuild()) {
        try {
          const { isAvailable } = await Updates.checkForUpdateAsync();
          incrementLoadedItems();
          if (isAvailable) {
            setUpdating(true);
            const { isNew } = await Updates.fetchUpdateAsync();
            incrementLoadedItems();
            if (isNew) {
              await Updates.reloadAsync();
            }
          } else {
            incrementLoadedItems();
          }
        } catch (e: unknown) {
          console.error(`update failed due to: ${e}`);
          incrementLoadedItems();
          incrementLoadedItems();
        }
      } else {
        incrementLoadedItems();
        incrementLoadedItems();
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setShown(true);
      setBackgroundColor('#eee');
      // Interpolate the progress based on the number of loaded items
      Animated.timing(progress, {
        toValue: (loadedItems / totalItemsToLoad) * (86 / 151), // Interpolate from 0 to 86
        duration: 500, // Smoothly animate to the new progress value
        easing: Easing.ease,
        useNativeDriver: false, // Lottie progress does not support native driver
      }).start();

      // Once all items are loaded, play the remaining frames
      if (loadedItems === totalItemsToLoad) {
        setBackgroundColor('#ee0');
        setTimeout(() => {
          // Final animation from frame 86 to 151 over 1 second
          Animated.timing(progress, {
            toValue: 1, // Full animation to the end
            duration: 1000, // 1 second for the final part of the animation
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {
            // Navigate to the tabs route once the animation completes
            router.replace('/(tabs)');
          });
        }, 500); // Small delay before playing the final animation
      }
      return () => {
        setShown(false);
      };
    }, [loadedItems, progress, router]),
  );

  if (shown) {
    return (
      <View style={styles.animationContainer} testID="splash-view">
        <MyText>{Updates.createdAt?.toISOString()}</MyText>
        <AnimatedLottieView
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor,
          }}
          testID="splash"
          progress={progress} // Casting to number to fix typing issue
          source={require('@/assets/cat-loader-2.json')} // JSON is needed as Android does not appear to support .lottie
        />
        <MyText>
          {updating ? 'Update detected, app will restart after updating' : ''}
        </MyText>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default LoaderScreen;
