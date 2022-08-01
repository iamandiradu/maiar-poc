import { ScrollView } from 'react-native';
import { styles } from './styles';

export const Content = () => {
  // TODO: offsets & insets
  return (
    <ScrollView style={styles.contentWrapper} contentInset={{ top: 100 }}>
      {/* Flatlist */}
    </ScrollView>
  );
};
