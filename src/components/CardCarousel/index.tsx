import Animated from 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import { mockData, mockDataType } from '../../assets/constants';
import { Card } from './Card';
import { FlipCard } from './FlipCard';
import { styleSet } from './styles';

interface Carousel {
    carouselHeight: Animated.SharedValue<number>;
}
const Carousel = (props: Carousel) => {
    const { carouselHeight } = props;

    const colorScheme = useColorScheme() || 'dark';
    const styles = styleSet(colorScheme);

    const renderCard = (item: mockDataType, index: number) => {
        return item?.back ? (
            <FlipCard
                key={`${index}-flip`}
                sides={[
                    <Card
                        title={item?.front?.title}
                        value={item?.front?.value}
                        key={`${index}-front`}
                        index={`${index}-front1`}
                        cardHeight={carouselHeight}
                    />,
                    <Card
                        title={item?.back?.title}
                        value={item?.back?.value}
                        key={`${index}-back`}
                        index={`${index}-back1`}
                        cardHeight={carouselHeight}
                    />,
                ]}
            />
        ) : (
            <Card
                key={`${index}-card`}
                index={`${index}-card1`}
                title={item?.front?.title}
                value={item?.front?.value}
                cardHeight={carouselHeight}
            />
        );
    };

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            contentInset={{ left: 15 }}
            contentOffset={{ x: -15, y: 0 }}>
            {mockData.map((item, index) => renderCard(item, index))}
        </Animated.ScrollView>
    );
};

export { Carousel };
