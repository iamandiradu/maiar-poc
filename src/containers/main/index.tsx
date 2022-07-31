import {View, useColorScheme} from 'react-native';

import Header from '../../components/MockHeader';
import Content from '../../components/MockContent';

import Footer from '../../components/MockFooter';
import {styleSet} from './styles';
interface Main {}

const Main = () => {
  // Defaults to dark
  const colorScheme = useColorScheme() || 'dark';
  const styles = styleSet(colorScheme);
  return (
    <View style={styles.content}>
      <Header />
      <Content />
      <Footer />
    </View>
  );
};

export default Main;
