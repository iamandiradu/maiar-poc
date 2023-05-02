import { Dimensions, StyleSheet } from 'react-native';
import { CAROUSEL_HEIGHT_MIN } from '../../assets/constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    listItem: {
        height: 80,
        backgroundColor: '#D9D9D9',
        width: '100%',
        marginBottom: 12,
        borderRadius: 10,
    },
    contentScroll: {
        height: height - CAROUSEL_HEIGHT_MIN * 2,
        marginHorizontal: 8,
        padding: 8,
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1,
    },
});
