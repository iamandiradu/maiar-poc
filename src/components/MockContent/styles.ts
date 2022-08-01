import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        width: '100%',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        flexGrow: 1,
        minHeight: 330,
    },
    content: {
        height: height * 0.75,
        width,
    },
});
