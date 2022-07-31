import {StyleSheet} from 'react-native';
import {Theme} from '../../theme/colors';

export const styleSet = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    content: {
      backgroundColor: Theme?.[colorScheme]?.background,
      height: '100%',
    },
  });
