import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    contentWrapper: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 330,
        zIndex: -9,
        padding: 12,
        marginHorizontal: 15,
    },
    content: {
        height: height * 0.75,
        width,
    },
    scrollItem: {
        height: 80,
        backgroundColor: '#D9D9D9',
        width: '100%',
        marginBottom: 12,
        borderRadius: 10,
    },
});
