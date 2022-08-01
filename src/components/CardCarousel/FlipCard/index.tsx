import { useState, ReactElement } from 'react';
import { Pressable } from 'react-native';

import ReanimatedFlip, { RotateAxis } from 'react-native-flip';
import { styles } from './styles';

interface FlipCard {
    sides: ReactElement[];
}

const FlipCard = (props: FlipCard) => {
    const { sides } = props;

    const [side, setSide] = useState(1);

    const flip = () => {
        setSide(Number(!side));
    };

    return (
        <Pressable onPress={flip}>
            <ReanimatedFlip
                side={side}
                rotate={RotateAxis.Y}
                style={styles.container}
                front={sides?.[0]}
                back={sides?.[1]}
            />
        </Pressable>
    );
};

export { FlipCard };
