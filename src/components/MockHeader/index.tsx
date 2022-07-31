import {Image} from 'react-native';
import {styles} from './styles';

const mock = require('../../assets/images/header.png');
const Header = () => {
  return <Image source={mock} resizeMode={'contain'} style={styles.content} />;
};

export default Header;
