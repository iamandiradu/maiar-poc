import {Image, ScrollView} from 'react-native';
import {styles} from './styles';

const mock = require('../../assets/images/content.png');
const Header = () => {
  // TODO: offsets & insets
  return (
    <ScrollView style={styles.contentWrapper} contentInset={{top: 100}}>
      <Image source={mock} resizeMode={'contain'} style={styles.content} />
    </ScrollView>
  );
};

export default Header;
