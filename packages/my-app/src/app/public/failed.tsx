/* eslint-disable */
import { FC, forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  RefreshControlProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DATA from '@/data/alex-jones-was-right.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate an async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  // const scrollValue = useSharedValue(0);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollValue.setValue(nativeEvent.contentOffset.y);
    },
    [scrollValue],
  );

  const MyHeader = () => {
    const insets = useSafeAreaInsets();
    // const scrollViewOffset = useScrollViewOffset(scrollViewRef);
    const backgroundColor = useMemo(() => {
      // at scroll offset zero my height is
      return 'red';
    }, []);
    // const animatedStyle = useAnimatedStyle(() => {
    //   // for now fixed heights
    //   // at scroll offset zero my height is
    //   // 'red';
    //
    //   return {
    //     height: interpolate(
    //       scrollViewOffset.value,
    //       [-100, 0],
    //       [300, 200],
    //       Extrapolation.CLAMP,
    //     ),
    //     backgroundColor: 'red',
    //   };
    // });
    return (
      <Animated.View
        testID="header"
        style={[styles.header, { position: 'absolute', width: 250 }]}
      >
        <Text style={styles.headerText}>My Header</Text>
      </Animated.View>
    );
  };

  const headerHeight = scrollValue.interpolate({
    inputRange: [-1000, 0, 50, 100],
    outputRange: [1200, 200, 100, 100],
  });
  const headerTop = scrollValue.interpolate({
    inputRange: [-1000, 0, 50, 100],
    outputRange: [-1000, 0, 50, 100],
  });
  const MyStickyHeaderRef = (props: any, ref: any) => {
    //Animated.scrollValue
    return (
      <Animated.View
        testID="header"
        style={[
          styles.header,
          {
            position: 'absolute',
            width: 250,
            top: headerTop,
            height: headerHeight,
          },
        ]}
      >
        <Text style={styles.headerText}>My Header2</Text>
      </Animated.View>
    );
  };
  const MyStickyHeader = forwardRef(MyStickyHeaderRef);

  const MyRefreshControl: FC<RefreshControlProps> = ({
    refreshing,
    onRefresh,
    progressViewOffset,
  }) => {
    return (
      <Animated.View testID="header" style={[styles.header, {}]}>
        <Text style={styles.headerText}>My Refresh Control</Text>
      </Animated.View>
    );
  };

  const isRefreshAvailable = false;
  return (
    <Animated.ScrollView
      testID="content"
      refreshControl={
        isRefreshAvailable ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      stickyHeaderIndices={[0]} // Make the header sticky
      style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollValue } } }],
        { useNativeDriver: false },
      )}
      StickyHeaderComponent={MyStickyHeader}
    >
      {/* Content */}
      {DATA.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <Text style={styles.item}>{item}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    // Height is animated
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  item: {
    fontSize: 16,
  },
});

export default MyScreen;
