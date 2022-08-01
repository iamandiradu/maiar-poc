import { View, useColorScheme } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Header } from '../../components/MockHeader';
import { Content } from '../../components/MockContent';
import { Footer } from '../../components/MockFooter';
import { Carousel } from '../../components/CardCarousel';

import { styleSet } from './styles';
interface Main {}

const Main = () => {
    // Defaults to dark
    const colorScheme = useColorScheme() || 'dark';
    const styles = styleSet(colorScheme);

    // Share Pan position thoughout the other components
    const panPosition = useSharedValue(0);

    return (
        <View style={styles.content}>
            <Header />
            <Carousel panPosition={panPosition} />
            <Content panPosition={panPosition} />
            <Footer />
        </View>
    );
};

export default Main;
