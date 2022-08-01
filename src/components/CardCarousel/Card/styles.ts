import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cardWrapper: {
        maxHeight: 200,
        width: 180,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 13,
    },
    title: {
        fontWeight: '400',
        fontSize: 20,
        color: '#000',
    },
    value: {
        fontWeight: '400',
        fontSize: 16,
        color: '#000',
    },
    cardContent: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },
});
