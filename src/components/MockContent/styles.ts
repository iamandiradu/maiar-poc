import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  contentWrapper: {flex: 1, width: '100%'},
  content: {
    height: height * 0.75,
    width,
  },
});
