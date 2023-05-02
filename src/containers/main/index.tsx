import { useRef } from 'react';
import {
    View,
    useColorScheme,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../../components/MockHeader';
import { Footer } from '../../components/MockFooter';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { styleSet } from './styles';
import {
    CAROUSEL_HEIGHT_MAX,
    CAROUSEL_HEIGHT_MIN,
    SCROLL_SNAP_POINT,
} from '../../assets/constants';
import { Carousel } from '../../components/CardCarousel';
import { Content } from '../../components/MockContent';

const Main = () => {
    // Defaults to dark
    const colorScheme = useColorScheme() || 'dark';
    const styles = styleSet(colorScheme);

    // // Share Carousel Height (calculated) to the other components
    const carouselHeight = useSharedValue(200);
    const scrollRef = useRef<ScrollView | null>(null);
    const secondScrollRef = useRef<ScrollView | null>(null);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset } = event?.nativeEvent;

        // Clamp carousel height value between limits
        carouselHeight.value = Math.min(
            Math.max(
                CAROUSEL_HEIGHT_MAX - contentOffset.y,
                CAROUSEL_HEIGHT_MIN,
            ),
            CAROUSEL_HEIGHT_MAX,
        );
    };
    const onEndScroll = () => {
        // Ease in to limits
        if (carouselHeight.value < SCROLL_SNAP_POINT) {
            carouselHeight.value = withTiming(CAROUSEL_HEIGHT_MIN);
            snapScrollTo(CAROUSEL_HEIGHT_MAX - CAROUSEL_HEIGHT_MIN);
        } else {
            carouselHeight.value = withTiming(CAROUSEL_HEIGHT_MAX);
            snapScrollTo(0);
        }
    };

    const snapScrollTo = (pos?: number) =>
        scrollRef.current?.scrollTo({ x: 0, y: pos || 0, animated: true });

    return (
        <View style={styles.content}>
            <Header />
            <ScrollView
                ref={scrollRef}
                stickyHeaderIndices={[0]}
                overScrollMode={'always'}
                onScroll={onScroll}
                onTouchEnd={onEndScroll}
                scrollEventThrottle={16}
                simultaneousHandlers={[scrollRef, secondScrollRef]}
                scrollEnabled
                scrollToOverflowEnabled
                showsVerticalScrollIndicator={false}>
                <Carousel carouselHeight={carouselHeight} />
                <Content carouselHeight={carouselHeight} />
            </ScrollView>
            <Footer />
        </View>
    );
};

export default Main;
