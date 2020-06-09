import React from 'react';

interface CellProps {
    x: number,
    y: number,
    size: number,
    curState: number,
    prevState: number
}

class Cell extends React.Component<CellProps, {}> {
    constructor(props: CellProps) {
        super(props);
    }

    display() {
        // if (this.state.previous === 0 && this.state.curState === 1) console.log("1");
        // else if (this.state.previous === 1 && this.state.curState === 0) {
        //     console.log("ht");
        // } else {

        // }
    }

    render() {
        const cellStyle = {
            position: 'absolute',
            left: `${this.props.x}px`,
            top: `${this.props.y}px`,
            width: `${this.props.size}px`,
            height: `${this.props.size}px`,
            border: "1px solid #000"
        }
        return(
            <div style={cellStyle}></div>
        );
    }
}

export default Cell;