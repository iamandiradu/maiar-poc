/* eslint-disable react-native/no-inline-styles */
import { useState, useRef, LegacyRef } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    ScrollView,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

// import { styles } from './styles';

interface Content {
    scrollPos: Animated.SharedValue<number>;
}

const Content = (props: Content) => {
    const { scrollPos } = props;
    const scrollRef = useRef<LegacyRef<ScrollView>>();
    const panHanRef = useRef<PanGestureHandler>();
    const [panEnabled, setPanEnabled] = useState(true);

    const renderItem = (item: number, index: number) => {
        return (
            <View
                style={{
                    height: 80,
                    width: '100%',
                    backgroundColor: '#D9D9D9',
                    marginBottom: 12,
                    borderRadius: 10,
                }}
                key={index}
            />
        );
    };

    const _onGesture = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { y: number }
    >({
        onStart: (_, context) => {
            context.y = scrollPos.value;
        },
        onActive: ({ translationY }, context) => {
            const pos = translationY + context.y;

            scrollPos.value = pos;
        },
    });
    // const _onGesturex = event => {
    //     const { translationY } = event.nativeEvent;
    //     const totalTranslationY = translationY + scrollPos.value;
    //     // const prevTranslation = y.value;
    //     // console.log('PAN:', translationY, ' PREV: ', totalTranslationY);
    //     // if (!panEnabled) return;
    //     if (translationY > 0) {
    //         // setPanEnabled(false);
    //     } else {
    //         // setPanEnabled(true);
    //     }
    //     // Reverse of ScrollView Pos axis
    //     // getScrollPos(-translationY);

    //     if (translationY < -100) {
    //         // console.log('SHOULD STOP');
    //         // setPanEnabled(false);
    //     }
    //     // const { translationY } = event.nativeEvent;
    //     // console.log(translationY);
    //     // getScrollPos(-translationY); // Reverse of ScrollView Pos axis
    //     scrollPos.value = translationY;
    // };

    //@ts-ignore
    const _onScroll = ({ nativeEvent }) => {
        console.log('SCROLL: ', nativeEvent.contentOffset.y);
        if (nativeEvent.contentOffset.y <= 0 && !panEnabled) {
            setPanEnabled(true);
        }
        if (nativeEvent.contentOffset.y > 0 && panEnabled) {
            setPanEnabled(true);
        }
    };

    const scrollViewStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scrollPos.value }],
    }));
    // return (
    //     <ScrollView
    //         style={[
    //             styles.contentWrapper,
    //             // { maxHeight: styles.contentWrapper.maxHeight + scrollPos },
    //         ]}
    //         contentContainerStyle={{ flexGrow: 1, padding: 13 }}
    //         // contentOffset={{ top: scrollPos }}
    //         maintainVisibleContentPosition={{
    //             minIndexForVisible: 1,
    //             autoscrollToTopThreshold: 0,
    //         }}
    //         showsVerticalScrollIndicator
    //         onScroll={e => getScrollPos(e.nativeEvent.contentOffset.y)}
    //         ref={scrollRef}
    //         // onMomentumScrollEnd={e => {
    //         //     if (e.nativeEvent.contentOffset.y > 0) {
    //         //         getScrollPos(250);
    //         //     } else {
    //         //         getScrollPos(0);
    //         //     }
    //         // }}
    //         scrollEventThrottle={1}
    //         // disableIntervalMomentum
    //         bounces={false}
    //         alwaysBounceVertical={false}
    //         // overScrollMode={'always'}
    //         // snapToEnd={false}
    //     >
    //         {[1, 2, 3, 4, 5].map((item, index) => renderItem(item, index))}
    //     </ScrollView>
    // );

    return (
        <ScrollView
            //@ts-ignore
            ref={scrollRef}
            waitFor={panEnabled ? panHanRef : scrollRef}
            scrollEventThrottle={40}
            onScroll={_onScroll}>
            <PanGestureHandler
                enabled={panEnabled}
                ref={panHanRef}
                activeOffsetY={[-5, 5]}
                failOffsetY={5}
                onGestureEvent={_onGesture}>
                <Animated.View style={scrollViewStyle}>
                    {[1, 2, 3, 4, 5].map((item, index) =>
                        renderItem(item, index),
                    )}
                </Animated.View>
            </PanGestureHandler>
        </ScrollView>
    );
};

export { Content };
