import { Text } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { styles } from './styles';

interface Card {
    title: string;
    value?: string;
    scrollPos: Animated.SharedValue<number>;
}
const Card = (props: Card) => {
    const { title, value, scrollPos } = props;

    const viewStyle = useAnimatedStyle(() => ({
        height: styles.cardWrapper.maxHeight + Math.max(scrollPos.value, -100),
    }));

    /* TODO: FLEX DIRECTION FIX */
    const cardStyle = useAnimatedStyle(() => {
        const elHeight = styles.cardWrapper.maxHeight;
        const flexDir =
            elHeight + scrollPos.value < elHeight * 0.75 ? 'row' : 'column';
        // console.log(flexDir);
        return {
            flexDirection: flexDir,
        };
    });

    return (
        <Animated.View style={[styles.cardWrapper, viewStyle]}>
            <Animated.View style={[styles.cardContent, cardStyle]}>
                <Text style={styles.title}>{title}</Text>
                {!!value && <Text style={styles.value}>{value}</Text>}
            </Animated.View>
        </Animated.View>
    );
};

export { Card };