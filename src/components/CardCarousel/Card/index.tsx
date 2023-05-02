import Animated, {
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';
import {
    CAROUSEL_HEIGHT_MAX,
    CAROUSEL_HEIGHT_MIN,
} from '../../../assets/constants';
import { styles } from './styles';

interface Card {
    title: string;
    value?: string;
    index?: number | string;
    cardHeight: Animated.SharedValue<number>;
}
const Card = (props: Card) => {
    const { title, value, index, cardHeight } = props;

    // Animated Card height
    const viewStyle = useAnimatedStyle(
        () => ({
            height: cardHeight.value,
        }),
        [cardHeight.value],
    );

    // Animated Title size & position
    const titleSizeSmall = 18;
    const titleSizeBig = styles.title.fontSize;
    const titleStyle = useAnimatedStyle(() => {
        return {
            // Compensate for Font scaling
            transform: [
                {
                    translateY: interpolate(
                        cardHeight.value,
                        [CAROUSEL_HEIGHT_MAX, CAROUSEL_HEIGHT_MIN],
                        [0, -(titleSizeBig - titleSizeSmall)],
                    ),
                },
            ],
            fontSize: interpolate(
                cardHeight.value,
                [CAROUSEL_HEIGHT_MAX, CAROUSEL_HEIGHT_MIN],
                [titleSizeBig, titleSizeSmall],
            ),
        };
    }, [cardHeight.value]);

    // Animated Value size & position
    const valueSizeSmall = 14;
    const valueSizeBig = styles.value.fontSize;

    const valueStyle = useAnimatedStyle(() => {
        return {
            // Compensate for Font scaling & Move to top-right
            transform: [
                {
                    translateX: interpolate(
                        cardHeight.value,
                        [CAROUSEL_HEIGHT_MAX, CAROUSEL_HEIGHT_MIN],
                        [0, styles.cardWrapper.width / 2],
                    ),
                },
                {
                    translateY: interpolate(
                        cardHeight.value,
                        [CAROUSEL_HEIGHT_MAX, CAROUSEL_HEIGHT_MIN],
                        [0, -valueSizeSmall - (valueSizeBig - valueSizeSmall)],
                    ),
                },
            ],
            fontSize: interpolate(
                cardHeight.value,
                [CAROUSEL_HEIGHT_MAX, CAROUSEL_HEIGHT_MIN],
                [valueSizeBig, valueSizeSmall],
            ),
        };
    }, [cardHeight.value]);

    return (
        <Animated.View
            style={[styles.cardWrapper, viewStyle]}
            key={`${index}-key`}>
            <Animated.View style={styles.cardContent} key={`${index}-key1`}>
                {/* Console is throwing an issue regarding styles which I didn't know how to
                solve */}
                <Animated.Text style={[styles.title, titleStyle]}>
                    {title}
                </Animated.Text>
                {!!value && (
                    <Animated.Text style={[styles.value, valueStyle]}>
                        {value}
                    </Animated.Text>
                )}
            </Animated.View>
        </Animated.View>
    );
};

export { Card };
