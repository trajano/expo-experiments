import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants';

export const SectionFooter: FC = () => {
  return (
    <View style={styles.sectionFooterContainer}>
      <Text style={styles.sectionFooterLabel}>Section footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionFooterContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: 12,
  },
  sectionFooterLabel: {
    color: colors.primaryGreen,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 20,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});
