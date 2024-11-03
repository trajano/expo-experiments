import _ from 'lodash';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import type { Meta, StoryObj } from '@storybook/react';
import ExpoConstants from 'expo-constants';
import { PreviewViewMode } from '@sb/preview';
import { FC, useCallback, useMemo } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { MyText } from 'react-native-my-text';

const FontRowView: FC<{
  fontFamilyName: string;
  fontSize: TextStyle['fontSize'];
  fontWeight: TextStyle['fontWeight'];
  testString: string;
}> = ({ fontFamilyName, fontSize, fontWeight, testString }) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>
          {fontFamilyName} {fontWeight}
        </MyText>
      </View>
      <Text
        style={{
          fontFamily: fontFamilyName,
          fontSize: fontSize,
          fontWeight: fontWeight,
        }}
      >
        {testString}
      </Text>
    </>
  );
};
const Separator: FC = () => <View style={styles.separator} />;

/**
 * Fonts I really want to see.
 */
const importantFonts = [
  'Arial',
  'Roboto',
  'Nunito',
  'Noto',
  'SF Pro',
  'sans-serif',
];

const FontView: FC<{
  fontSize: TextStyle['fontSize'];
  testString: string;
  fontWeight: TextStyle['fontWeight'];
  importantFontsOnly: boolean;
}> = ({ fontSize, fontWeight, testString, importantFontsOnly }) => {
  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item }) => (
      <FontRowView
        fontFamilyName={item}
        fontSize={fontSize}
        fontWeight={fontWeight}
        testString={testString}
      />
    ),
    [fontSize, fontWeight, testString],
  );
  const fontsToRender = useMemo<string[]>(() => {
    const fontsToPrepend = importantFonts.filter((font) =>
      ExpoConstants.systemFonts.includes(font),
    );
    if (importantFontsOnly) {
      return fontsToPrepend;
    }
    return _.uniq([...fontsToPrepend, ...ExpoConstants.systemFonts]);
  }, [importantFontsOnly]);

  return (
    <FlashList
      contentContainerStyle={styles.container}
      data={fontsToRender}
      estimatedItemSize={100}
      ItemSeparatorComponent={Separator}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
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
  separator: {
    height: 10,
  },
});

const fontWeights = [
  'normal',
  'bold',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];
const meta: Meta<typeof FontView> = {
  title: 'Font',
  component: FontView,
  argTypes: {
    fontSize: {},
    fontWeight: {
      options: fontWeights,
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    notes: 'This shows the native system fonts.',
  },
};

export default meta;

type Story = StoryObj<typeof FontView>;

export const QuickBrownFox: Story = {
  args: {
    fontSize: 16,
    fontWeight: '400',
    importantFontsOnly: false,
    testString: 'The quick brown fox jumped over the lazy dogs.',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const JordanPeterson: Story = {
  args: {
    fontSize: 16,
    fontWeight: '400',
    importantFontsOnly: true,
    // This is a ChatGPT response to
    // give me a string in the style of a Jordan Peterson quote that would use as much of the alphabet as possible, numbers would also be a bonus.
    testString:
      'To seek clarity in a world that thrives on chaos, you must position yourself as a beacon of order, illuminating the path from A to Z, even if that means deciphering 1,000 paradoxes along the way, embracing both the known and the unknown, the x-factor and the y, till every question mark morphs into the solid ground of understanding.',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};

export const AlexJones: Story = {
  args: {
    fontSize: 16,
    fontWeight: '700',
    importantFontsOnly: true,
    // This is a ChatGPT response to
    // give me a string in the style of a Jordan Peterson quote that would use as much of the alphabet as possible, numbers would also be a bonus.
    testString:
      'They’re watching you 24/7! 🕵️‍♂️👁️ From A to Z, they’re using every tool—💻📲🔍—to control your life! Wake up before it’s too late! 🚨🔥 1% of people see the truth, but the rest? Asleep! 💤💡',
  },
  parameters: {
    backgrounds: {
      default: 'plain',
    },
    previewViewMode: PreviewViewMode.NO_SCROLL_VIEW,
  },
};
