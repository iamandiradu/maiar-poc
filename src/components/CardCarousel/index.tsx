import { FlatList, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { Card } from './Card';
import { FlipCard } from './FlipCard';
import { styles } from './styles';

type dataType = {
    front: {
        title: string;
        value: string;
    };
    back?: {
        title: string;
        value: string;
    };
};
const mockData = [
    {
        front: {
            title: 'FLIP 1',
            value: '$123,45',
        },
        back: {
            title: 'BACK 1',
            value: '$543,21',
        },
    },
    {
        front: {
            title: 'CARD 2',
            value: '$123,45',
        },
    },
    {
        front: {
            title: 'FLIP 3',
            value: '$123,45',
        },
        back: {
            title: 'BACK 3',
            value: '$543,21',
        },
    },
    {
        front: {
            title: 'CARD 4',
            value: '$123,45',
        },
    },
];

interface Carousel {
    panPosition: Animated.SharedValue<number>;
}
const Carousel = (props: Carousel) => {
    const { panPosition } = props;

    const renderCard = ({ item }: { item: dataType }) => {
        return item?.back ? (
            <FlipCard
                sides={[
                    <Card
                        title={item?.front?.title}
                        value={item?.front?.value}
                        panPosition={panPosition}
                    />,
                    <Card
                        title={item?.back?.title}
                        value={item?.back?.value}
                        panPosition={panPosition}
                    />,
                ]}
            />
        ) : (
            <Card
                title={item?.front?.title}
                value={item?.front?.value}
                panPosition={panPosition}
            />
        );
    };

    const viewStyle = useAnimatedStyle(() => ({
        height: styles.wrapper.height + panPosition.value,
    }));

    return (
        <Animated.View style={[styles.wrapper, viewStyle]}>
            <FlatList
                contentOffset={{ x: -15, y: 0 }}
                contentInset={{ left: 15 }}
                contentContainerStyle={styles.contentContainer}
                horizontal
                showsVerticalScrollIndicator={false}
                data={mockData}
                renderItem={renderCard}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </Animated.View>
    );
};

export { Carousel };
