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

    // const [scrollPos, setScrollPos] = useState(0);
    const scrollPos = useSharedValue(0);
    // console.log(scrollPos);
    return (
        <View style={styles.content}>
            <Header />
            <Carousel scrollPos={scrollPos} />
            <Content scrollPos={scrollPos} />
            <Footer />
        </View>
    );
};

export default Main;
