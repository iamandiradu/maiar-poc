import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { CAROUSEL_HEIGHT_MAX } from '../../assets/constants';
import { styles } from './styles';

interface Content {
    carouselHeight: Animated.SharedValue<number>;
}

const Content = (props: Content) => {
    const { carouselHeight } = props;

    const renderItem = (_item: number, index: number) => {
        return <View style={styles.listItem} key={`${index}-item`} />;
    };

    const scrollOffset = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: CAROUSEL_HEIGHT_MAX - carouselHeight.value },
            ],
        };
    }, [carouselHeight.value]);

    return (
        <Animated.ScrollView
            scrollEnabled={false}
            style={[styles.contentScroll, scrollOffset]}>
            {[1, 2, 3, 4, 5].map((item, index) => renderItem(item, index))}
        </Animated.ScrollView>
    );
};

export { Content };
