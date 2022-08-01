/* Source: https://joshgoestoflatiron.medium.com/a-card-flip-animation-in-react-native-with-hooks-89af1ebd0386 */

import { ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    withTiming,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    useDerivedValue,
} from 'react-native-reanimated';

interface FlipCard {
    sides: ReactElement[];
}

const FlipCard = (props: FlipCard) => {
    const { sides = [] } = props;

    const flipAnimation = useSharedValue(0);

    const opacityFront = useDerivedValue(() => {
        return withTiming(flipAnimation.value < 90 ? 1 : 0, {
            duration: 250,
            easing: Easing.out(Easing.ease),
        });
    }, [flipAnimation.value]);

    const opacityBack = useDerivedValue(() => {
        return withTiming(flipAnimation.value > 90 ? 1 : 0, {
            duration: 250,
            easing: Easing.out(Easing.ease),
        });
    }, [flipAnimation.value]);

    const flipToFrontStyle = useAnimatedStyle(() => {
        const rotation = interpolate(flipAnimation.value, [0, 180], [0, 180], {
            extrapolateRight: Extrapolate.CLAMP,
        });

        return {
            opacity: opacityFront.value,
            transform: [{ rotateY: `${rotation}deg` }],
            display: rotation < 90 ? 'flex' : 'none',
        };
    }, [flipAnimation.value]);

    const flipToBackStyle = useAnimatedStyle(() => {
        const rotation = interpolate(flipAnimation.value, [0, 180], [180, 0], {
            extrapolateRight: Extrapolate.CLAMP,
        });

        return {
            opacity: opacityBack.value,
            transform: [{ rotateY: `${rotation}deg` }],
        };
    }, [flipAnimation.value]);

    const flipToFront = () => {
        flipAnimation.value = withTiming(0, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
        });
    };
    const flipToBack = () => {
        flipAnimation.value = withTiming(180, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
        });
    };

    return (
        <Pressable
            onPress={() =>
                flipAnimation.value ? flipToFront() : flipToBack()
            }>
            <Animated.View style={{ ...style.cardFront, ...flipToFrontStyle }}>
                {sides?.[0]}
            </Animated.View>
            <Animated.View style={{ ...style.cardBack, ...flipToBackStyle }}>
                {sides?.[1]}
            </Animated.View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    cardFront: {
        position: 'absolute',
        // backfaceVisibility: 'hidden',
    },
    cardBack: {
        // backfaceVisibility: 'hidden',
    },
});

export { FlipCard };
