import { useState, ReactElement } from 'react';
import { Pressable } from 'react-native';

import ReanimatedFlip, { RotateAxis } from './package';
import { styles } from './styles';

interface FlipCard {
    sides: ReactElement[];
    index?: number | string;
}

const FlipCard = (props: FlipCard) => {
    const { sides, index } = props;

    const [side, setSide] = useState(1);

    const flip = () => {
        setSide(Number(!side));
    };

    return (
        <Pressable onPress={flip} key={index}>
            <ReanimatedFlip
                key={`${index}-2`}
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
