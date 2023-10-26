import React from 'react';
interface props {
    height: number,
}
const Height: React.FC<props> = ({ height }) => {
    return (<>
        <div style={{ height: `${height}px` }}></div>
    </>);
}

export default Height;