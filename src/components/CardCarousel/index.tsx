import { FlatList, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { Card } from './Card';
import { FlipCard } from './FlipCard';
import { styles } from './styles';

const mockData = [
    {
        title: 'FRONT',
        value: '$123,45',
        title2: 'BACK',
        value2: '$543,21',
    },
    {
        title: 'Second',
        value: '$123,45',
    },
    {
        title: 'Third',
        value: '$123,45',
    },
    {
        title: 'Fourth',
        value: '$123,45',
    },
];

interface Carousel {
    scrollPos: Animated.SharedValue<number>;
}
const Carousel = (props: Carousel) => {
    const { scrollPos } = props;

    const renderCard = ({
        item,
    }: {
        item: {
            title: string;
            value: string;
            title2?: string;
            value2?: string;
        };
    }) => {
        return item?.title2 ? (
            <FlipCard
                sides={[
                    <Card
                        title={item?.title}
                        value={item?.value}
                        scrollPos={scrollPos}
                    />,
                    <Card
                        title={item?.title2}
                        value={item?.value2}
                        scrollPos={scrollPos}
                    />,
                ]}
            />
        ) : (
            <Card
                title={item?.title}
                value={item?.value}
                scrollPos={scrollPos}
            />
        );
    };

    const viewStyle = useAnimatedStyle(() => ({
        height: styles.wrapper.height + Math.max(scrollPos.value, -100),
    }));

    return (
        <Animated.View style={[styles.wrapper, viewStyle]}>
            <FlatList
                contentContainerStyle={styles.contentContainer}
                contentOffset={{ x: -10, y: 0 }}
                contentInset={{ left: 10 }}
                horizontal
                data={mockData}
                renderItem={renderCard}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </Animated.View>
    );
};

export { Carousel };
