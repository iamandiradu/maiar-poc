const CAROUSEL_HEIGHT_MIN = 50;
const CAROUSEL_HEIGHT_MAX = 200;
const SCROLL_SNAP_POINT = CAROUSEL_HEIGHT_MAX / 2;

export type mockDataType = {
    front: {
        title: string;
        value: string;
    };
    back?: {
        title: string;
        value: string;
    };
};

const mockData = [
    {
        front: {
            title: 'FLIP 1',
            value: '$123,45',
        },
        back: {
            title: 'BACK 1',
            value: '$543,21',
        },
    },
    {
        front: {
            title: 'CARD 2',
            value: '$123,45',
        },
    },
    {
        front: {
            title: 'FLIP 3',
            value: '$123,45',
        },
        back: {
            title: 'BACK 3',
            value: '$543,21',
        },
    },
    {
        front: {
            title: 'CARD 4',
            value: '$123,45',
        },
    },
];

export {
    CAROUSEL_HEIGHT_MAX,
    CAROUSEL_HEIGHT_MIN,
    SCROLL_SNAP_POINT,
    mockData,
};
