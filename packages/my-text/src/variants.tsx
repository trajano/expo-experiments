/**
 * This module provides font variants to make it easier to do font style switching.
 */
import { FC, PropsWithChildren } from 'react';
import { MyText, MyTextE } from './MyText';
import { StyleSheet } from 'react-native';

export const Strong: FC<PropsWithChildren> = ({ children }) => (
  <MyText style={styles.strong}>{children}</MyText>
);
export const StrongE: FC<PropsWithChildren> = ({ children }) => (
  <MyTextE style={styles.strong}>{children}</MyTextE>
);

export const Em: FC<PropsWithChildren> = ({ children }) => (
  <MyText style={styles.em}>{children}</MyText>
);
export const EmE: FC<PropsWithChildren> = ({ children }) => (
  <MyTextE style={styles.em}>{children}</MyTextE>
);

const styles = StyleSheet.create({
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
});
