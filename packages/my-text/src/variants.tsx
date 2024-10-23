/**
 * This module provides font variants to make it easier to do font style switching.
 */
import { FC, PropsWithChildren } from 'react';
import { MyText, MyTextE } from './MyText';
import { StyleSheet, TextProps } from 'react-native';

export const Strong: FC<PropsWithChildren<Omit<TextProps, 'style'>>> = ({
  children,
  ...props
}) => (
  <MyText {...props} style={styles.strong}>
    {children}
  </MyText>
);
export const StrongE: FC<PropsWithChildren<Omit<TextProps, 'style'>>> = ({
  children,
  ...props
}) => (
  <MyTextE {...props} style={styles.strong}>
    {children}
  </MyTextE>
);

export const Em: FC<PropsWithChildren<Omit<TextProps, 'style'>>> = ({
  children,
  ...props
}) => (
  <MyText {...props} style={styles.em}>
    {children}
  </MyText>
);
export const EmE: FC<PropsWithChildren<Omit<TextProps, 'style'>>> = ({
  children,
  ...props
}) => (
  <MyTextE {...props} style={styles.em}>
    {children}
  </MyTextE>
);

const styles = StyleSheet.create({
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
});
