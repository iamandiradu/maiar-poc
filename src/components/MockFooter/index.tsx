import {Image} from 'react-native';
import {styles} from './styles';

const mock = require('../../assets/images/footer.png');
const Footer = () => {
  return <Image source={mock} resizeMode={'contain'} style={styles.content} />;
};

export default Footer;
