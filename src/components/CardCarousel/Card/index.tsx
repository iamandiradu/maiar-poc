import { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    runOnJS,
} from 'react-native-reanimated';
import { styles } from './styles';

interface Card {
    title: string;
    value?: string;
    panPosition: Animated.SharedValue<number>;
}
const FLEX_LIMIT = 65;
const Card = (props: Card) => {
    const { title, value, panPosition } = props;

    // Animated Card height
    const viewStyle = useAnimatedStyle(
        () => ({
            height: styles.cardWrapper.maxHeight + panPosition.value,
        }),
        [panPosition.value],
    );

    // Flex directionm change is not functional
    const [flexDirection, setFlexDirection] = useState<
        number | 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined
    >('column');

    const switchFlexDirection = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (flexDirection === 'column') {
            setFlexDirection('row');
        } else {
            setFlexDirection('column');
        }
    };

    useDerivedValue(() => {
        if (-panPosition.value > FLEX_LIMIT) {
            runOnJS(switchFlexDirection)();
        }
        return {};
    });

    return (
        <Animated.View style={[styles.cardWrapper, viewStyle]}>
            <Animated.View
                style={[styles.cardContent, { flexDirection: flexDirection }]}>
                <Animated.Text style={styles.title}>{title}</Animated.Text>
                {!!value && (
                    <Animated.Text style={styles.value}>{value}</Animated.Text>
                )}
            </Animated.View>
        </Animated.View>
    );
};

export { Card };
