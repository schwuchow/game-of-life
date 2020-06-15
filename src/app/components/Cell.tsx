import React from 'react';

interface CellProps {
    x: number,
    y: number,
    size: number,
    curState: number
}

const Cell: React.FC<CellProps> = (props) => {

    let backgroundColor = evalState();
    const cellStyle = {
        position: 'absolute',
        left: `${props.x}px`,
        top: `${props.y}px`,
        width: `${props.size}px`,
        height: `${props.size}px`,
        border: "1px solid #4CAF50",
        borderRadius: "10px",
        backgroundColor
    }

    function evalState() {
        return (props.curState === 1)? '#4CAF50': 'white';
    }

    return(
        <div style={cellStyle}></div>
    );
}

export default Cell;