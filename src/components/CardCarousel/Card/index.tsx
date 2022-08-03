import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { styles } from './styles';

interface Card {
    title: string;
    value?: string;
    panPosition: Animated.SharedValue<number>;
}
const Card = (props: Card) => {
    const { title, value, panPosition } = props;

    // Animated Card height
    const viewStyle = useAnimatedStyle(
        () => ({
            height: styles.cardWrapper.maxHeight + panPosition.value,
        }),
        [panPosition.value],
    );

    return (
        <Animated.View style={[styles.cardWrapper, viewStyle]}>
            <Animated.View style={styles.cardContent}>
                <Animated.Text style={styles.title}>{title}</Animated.Text>
                {!!value && (
                    <Animated.Text style={styles.value}>{value}</Animated.Text>
                )}
            </Animated.View>
        </Animated.View>
    );
};

export { Card };
