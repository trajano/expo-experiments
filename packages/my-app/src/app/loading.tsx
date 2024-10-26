import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
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

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const LoaderScreen: FC = () => {
  const animation = useRef<LottieView>(null);
  const router = useRouter();
  const progress = useRef(new Animated.Value(0)).current; // Animated value to control progress
  const [loadedItems, incrementLoadedItems] = useReducer((i) => i + 1, 0);
  const totalItemsToLoad = 3;
  const [backgroundColor, setBackgroundColor] = useState('#eee');
  const [shown, setShown] = useState(true);

  // Simulate loading items with random intervals
  useEffect(() => {
    (async () => {
      incrementLoadedItems();
      const { isAvailable } = await Updates.checkForUpdateAsync();
      incrementLoadedItems();
      if (isAvailable) {
        const { isNew } = await Updates.fetchUpdateAsync();
        incrementLoadedItems();
        if (isNew) {
          await Updates.reloadAsync();
        }
      } else {
        incrementLoadedItems();
      }
    })();

    // const loadItems = () => {
    //   if (loadedItems < totalItemsToLoad) {
    //     const randomInterval = Math.random() * 300 + 200; // Random delay between 200ms to 500ms
    //     setTimeout(() => {
    //       incrementLoadedItems(); // Increment the loaded item count
    //     }, randomInterval);
    //   }
    // };
    //
    // // Repeat until all items are loaded
    // if (loadedItems < totalItemsToLoad) {
    //   loadItems();
    // }
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
            router.push('/(tabs)');
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
        <AnimatedLottieView
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor,
          }}
          testID="splash"
          progress={progress} // Casting to number to fix typing issue
          source={require('@/assets/cat-loader-2.json')}
        />
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
