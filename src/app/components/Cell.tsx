import React from 'react';

interface CellProps {
    x: number,
    y: number,
    size: number,
    curState: number
}

class Cell extends React.Component<CellProps, {}> {
    constructor(props: CellProps) {
        super(props);
    }

    evalState() {
        return (this.props.curState === 1)? 'black': 'white';
    }

    render() {
        let backgroundColor = this.evalState();
        const cellStyle = {
            position: 'absolute',
            left: `${this.props.x}px`,
            top: `${this.props.y}px`,
            width: `${this.props.size}px`,
            height: `${this.props.size}px`,
            border: "1px solid #000",
            backgroundColor
        }
        return(
            <div style={cellStyle}></div>
        );
    }
}

export default Cell;