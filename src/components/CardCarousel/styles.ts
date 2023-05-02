import { StyleSheet } from 'react-native';
import { CAROUSEL_HEIGHT_MIN } from '../../assets/constants';
import { Theme } from '../../theme/colors';

export const styleSet = (colorScheme: 'light' | 'dark') =>
    StyleSheet.create({
        carousel: {
            marginBottom: 20,
            zIndex: 99,
            backgroundColor: Theme?.[colorScheme]?.background,
            paddingVertical: 8,
            minHeight: CAROUSEL_HEIGHT_MIN,
        },
    });
