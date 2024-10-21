import type { Meta, StoryObj } from '@storybook/react';
import {
  addOrientationChangeListener,
  getOrientationAsync,
  getOrientationLockAsync,
  Orientation,
  OrientationLock,
} from 'expo-screen-orientation';
import { FC, useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { MyText } from 'react-native-my-text';
const DimensionsView: FC = () => {
  const screenDimensions = Dimensions.get('screen');
  const windowDimensionsViaGet = Dimensions.get('window');
  const windowDimensions = useWindowDimensions();
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.UNKNOWN,
  );
  const [orientationLock, setOrientationLock] = useState<OrientationLock>(
    OrientationLock.UNKNOWN,
  );
  useEffect(() => {
    let mounted = true;
    (async () => {
      const nextOrientation = await getOrientationAsync();
      const nextOrientationLock = await getOrientationLockAsync();
      if (mounted) {
        setOrientation(nextOrientation);
        setOrientationLock(nextOrientationLock);
      }
    })();
    const subscription = addOrientationChangeListener(
      ({
        orientationInfo: nextOrientationInfo,
        orientationLock: nextOrientationLock,
      }) => {
        if (mounted) {
          setOrientation(nextOrientationInfo.orientation);
          setOrientationLock(nextOrientationLock);
        }
      },
    );
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>useWindowDimensions</MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(windowDimensions, null, 2)}
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Screen Orientation</MyText>
      </View>
      <MyText style={styles.text}>{Orientation[orientation]}</MyText>
      <MyText style={styles.text}>
        {JSON.stringify(orientation, null, 2)}
      </MyText>
      <MyText style={styles.text}>
        {JSON.stringify(
          {
            orientationLock: OrientationLock[orientationLock],
          },
          null,
          2,
        )}
      </MyText>

      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>
          Dimensions.get("screen")
        </MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(screenDimensions, null, 2)}
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>
          Dimensions.get("window")
        </MyText>
        <MyText style={styles.sectionHeaderText}>
          This does not update with screen rotations
        </MyText>
      </View>
      <MyText style={styles.text}>
        {JSON.stringify(windowDimensionsViaGet, null, 2)}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    padding: 20,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: 'black',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito',
  },
});

const meta: Meta<typeof DimensionsView> = {
  title: 'Dimensions',
  component: DimensionsView,
  parameters: {
    notes: 'This checks Dimensions information.',
  },
};

export default meta;

type Story = StoryObj<typeof DimensionsView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
