import React from 'react';

const HorizontalLine = () => {
    const lineStyle = {
        border: 'none',
        borderBottom: '1px solid blue',
        margin: '12px'
    };

    return <hr style={lineStyle} />;
};

export default HorizontalLine;
