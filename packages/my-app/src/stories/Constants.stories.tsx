import type { Meta, StoryObj } from '@storybook/react';
import * as ExpoApplication from 'expo-application';
import ExpoConstants from 'expo-constants';
import * as ExpoFileSystem from 'expo-file-system';
import * as Localization from 'expo-localization';
import * as ExpoManifests from 'expo-manifests';
import * as ExpoUpdates from 'expo-updates';
import { FC } from 'react';
import { Platform as RNPlatform, StyleSheet, View } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { MyText } from 'react-native-my-text';
const ConstantsView: FC<{ content: Record<string, unknown> }> = ({
  content,
}) => {
  return (
    <View style={styles.container}>
      <JSONTree
        data={JSON.parse(JSON.stringify(content))}
        shouldExpandNode={() => true}
        hideRoot={true}
        labelRenderer={(keypath) => (
          <MyText style={{ fontSize: 20 }}>{keypath[0]}</MyText>
        )}
        valueRenderer={(raw) => (
          <MyText style={{ fontSize: 16 }}>
            {typeof raw === 'string' ? raw : JSON.stringify(raw)}
          </MyText>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {},
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

const meta: Meta<typeof ConstantsView> = {
  title: 'Constants',
  component: ConstantsView,
  parameters: {
    notes: 'This checks constant values',
  },
};

export default meta;

type Story = StoryObj<typeof ConstantsView>;

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
  args: {
    content: Localization.getCalendars() as unknown as Record<string, unknown>,
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};

export const Locales: Story = {
  args: {
    content: Localization.getLocales() as unknown as Record<string, unknown>,
  },
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

export const Platform: Story = {
  args: { content: RNPlatform as unknown as Record<string, unknown> },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
