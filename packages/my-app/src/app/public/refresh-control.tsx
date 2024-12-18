import { useState, useRef, useCallback } from 'react';
import { Animated, RefreshControl, View, Text, StyleSheet } from 'react-native';

// Import your data set
import DATA from '@/data/alex-jones-was-right.json';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;
const SCROLL_THRESHOLD = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const MyScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Animated value for scroll position
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0); // To track the last scroll position
  const isCollapsed = useRef(false); // To track if the header is collapsed

  // Animated value for header height
  const headerHeight = useRef(new Animated.Value(HEADER_MAX_HEIGHT)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate an async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Handle scroll event
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        const deltaY = y - lastScrollY.current;
        lastScrollY.current = y;

        // Handle header height only when not refreshing
        if (!refreshing) {
          // Scrolling up
          if (deltaY > 0) {
            if (y > SCROLL_THRESHOLD) {
              if (!isCollapsed.current) {
                isCollapsed.current = true;
                Animated.timing(headerHeight, {
                  toValue: HEADER_MIN_HEIGHT,
                  duration: 200,
                  useNativeDriver: false,
                }).start();
              }
            } else {
              // Allow header to shrink while scrolling up before collapsing
              const newHeight = HEADER_MAX_HEIGHT - y;
              headerHeight.setValue(newHeight);
            }
          }
          // Scrolling down
          else {
            if (y <= 0) {
              // At the top, expand the header
              if (isCollapsed.current) {
                isCollapsed.current = false;
                Animated.timing(headerHeight, {
                  toValue: HEADER_MAX_HEIGHT,
                  duration: 200,
                  useNativeDriver: false,
                }).start();
              }
            }
            // If header is not collapsed yet, expand it as we scroll down towards the top
            else if (!isCollapsed.current && y < SCROLL_THRESHOLD) {
              const newHeight = HEADER_MAX_HEIGHT - y;
              headerHeight.setValue(newHeight);
            }
          }
        }
      },
    },
  );

  // Handle overscroll for pull-to-refresh
  const overscroll = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [200, 0],
    extrapolate: 'clamp',
  });

  // Combine header height with overscroll
  const combinedHeaderHeight = Animated.add(headerHeight, overscroll);

  const MyHeader = () => (
    <Animated.View
      testID="header"
      style={[
        styles.header,
        {
          height: combinedHeaderHeight,
        },
      ]}
    >
      <Text style={styles.headerText}>My Header</Text>
    </Animated.View>
  );

  return (
    <Animated.ScrollView
      testID="content"
      scrollEventThrottle={16}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      stickyHeaderIndices={[0]} // Make the header sticky
      style={styles.container}
    >
      <MyHeader />
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
