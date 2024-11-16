import { Tabs } from 'expo-router';
import { FC } from 'react';

import {
  Colors,
  TabBarBackground,
  HapticTab,
} from 'react-native-my-components';
import { TabBarIcon } from '@/components/TabBarIcon';
import { Platform, useColorScheme } from 'react-native';

const TabLayout: FC = () => {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              testID="home-tab-button"
              accessibilityLabel="home tab button"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
              testID="explore-tab-button"
              accessibilityLabel="explore-tab-button"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="formik"
        options={{
          title: 'Formik',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
              testID="formik-tab-button"
              accessibilityLabel="formik tab button"
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
