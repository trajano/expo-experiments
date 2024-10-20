import type { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText } from 'react-native-my-text';
import * as ExpoManifests from 'expo-manifests';
import ExpoConstants from 'expo-constants';
import * as ExpoApplication from 'expo-application';
import * as ExpoUpdates from 'expo-updates';
import * as Localization from 'expo-localization';
import * as ExpoFileSystem from 'expo-file-system';
const DebugView: FC<{ content: object }> = ({ content }) => {
  return (
    <View style={styles.container}>
      <MyText style={styles.text}>{JSON.stringify(content, null, 2)}</MyText>
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

const meta: Meta<typeof DebugView> = {
  title: 'Debug',
  component: DebugView,
  parameters: {
    notes:
      'This checks the functionality of the ECMAScript Internationalization API.',
  },
};

export default meta;

type Story = StoryObj<typeof DebugView>;

export const Constants: Story = {
  args: { content: ExpoConstants },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const ConstantsSubset: Story = {
  args: {
    content: {
      appOwnership: ExpoConstants.appOwnership,
      expoConfig: ExpoConstants.expoConfig,
    },
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Application: Story = {
  args: { content: ExpoApplication },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Updates: Story = {
  args: { content: ExpoUpdates },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Calendars: Story = {
  args: { content: Localization.getCalendars() },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Locales: Story = {
  args: { content: Localization.getLocales() },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const FileSystem: Story = {
  args: { content: ExpoFileSystem },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Manifests: Story = {
  args: { content: ExpoManifests },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
