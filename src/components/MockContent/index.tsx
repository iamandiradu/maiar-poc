import { useState, useRef } from 'react';
import { View, NativeScrollEvent } from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    runOnJS,
    withTiming,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    ScrollView,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import { styles } from './styles';

interface Content {
    panPosition: Animated.SharedValue<number>;
}

const PAN_TOP_LIMIT = -133;
const PAN_BOTTOM_LIMIT = 0;

const Content = (props: Content) => {
    const { panPosition } = props;
    const scrollRef = useRef<ScrollView | null>(null);
    const panHanRef = useRef<PanGestureHandler>();
    const [panEnabled, setPanEnabled] = useState(true);

    const renderItem = (_item: number, index: number) => {
        return <View style={styles.scrollItem} key={index} />;
    };

    const _onGesture = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { y: number }
    >({
        onStart: (_, context) => {
            // Store Pan position
            context.y = panPosition.value;
        },
        onActive: ({ translationY }, context) => {
            // Prevent momentum
            const pos = Math.max(translationY + context.y, PAN_TOP_LIMIT);
            panPosition.value = pos;
            // Enable Scroll on Pan limits
            if (pos >= PAN_BOTTOM_LIMIT || pos <= PAN_TOP_LIMIT) {
                // Toggle between PanGestureHandler & ScrollView
                runOnJS(setPanEnabled)(false);
            }
        },
        onEnd: () => {
            // Ease in to the Pan limits
            if (panPosition.value < PAN_TOP_LIMIT / 2) {
                panPosition.value = withTiming(PAN_TOP_LIMIT);
            } else {
                panPosition.value = withTiming(0);
            }
        },
    });

    const _onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
        // Enable Pan on Scroll release
        if (
            nativeEvent.contentOffset.y >= -1 &&
            panPosition.value >= PAN_TOP_LIMIT &&
            !panEnabled
        ) {
            // Prevent momentum
            if (panPosition.value > 0) {
                panPosition.value = 0;
            }

            // Toggle between PanGestureHandler & ScrollView
            setPanEnabled(true);
        }
    };

    const snapScrollToTop = () =>
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });

    return (
        <ScrollView
            ref={scrollRef}
            waitFor={panEnabled ? panHanRef : scrollRef}
            simultaneousHandlers={[panHanRef, scrollRef]}
            scrollEventThrottle={16}
            onScroll={_onScroll}
            onScrollEndDrag={snapScrollToTop}
            style={styles.contentWrapper}
            enabled={!panEnabled}
            showsVerticalScrollIndicator={false}>
            <PanGestureHandler
                enabled={panEnabled}
                ref={panHanRef}
                waitFor={panEnabled ? panHanRef : scrollRef}
                simultaneousHandlers={[panHanRef, scrollRef]}
                activeOffsetY={[-5, 5]}
                onGestureEvent={_onGesture}>
                <Animated.View>
                    {[1, 2, 3, 4, 5].map((item, index) =>
                        renderItem(item, index),
                    )}
                </Animated.View>
            </PanGestureHandler>
        </ScrollView>
    );
};

export { Content };
