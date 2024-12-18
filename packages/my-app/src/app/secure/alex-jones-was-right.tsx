import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import DATA from '@/data/alex-jones-was-right.json';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;
const HEADER_TITLE = 'Alex Jones Was Right';
const SUBTITLE = ['Paul Joseph Watson', 'Owen Shroyer', 'Harrison Smith'];

const AlexJonesWasRightFlatList = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        Extrapolate.CLAMP,
      ),
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            [50, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          {HEADER_TITLE}
        </Animated.Text>
        <View style={styles.subtitleContainer}>
          {SUBTITLE.map((member, index) => (
            <Text key={index} style={styles.subtitle}>
              {member}
            </Text>
          ))}
        </View>
      </Animated.View>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitleContainer: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  item: {
    padding: 16,
    backgroundColor: '#d3d3d3',
    marginBottom: 8,
    borderRadius: 4,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
});
export default AlexJonesWasRightFlatList;
