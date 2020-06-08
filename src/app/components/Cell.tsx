import React from 'react';

interface CellProps {

}

interface CellState {
    x: number,
    y: number,
    size: number,
    curState: number,
    previous: number
}

class Cell extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            size: 10,
            curState: 0,
            previous: 0
        }
    }

    display() {
        if (this.state.previous === 0 && this.state.curState === 1) console.log("1");
        else if (this.state.previous === 1 && this.state.curState === 0) {
            console.log("ht");
        } else {

        }
    }

    render() {
        const cellStyle = {
            position: "relative",
            top: `${this.state.x}px`,
            left: `${this.state.y}px`,
            width: `${this.state.size}px`,
            height: `${this.state.size}px`,
            border: "1px solid #000"
        }
        return(
            <div style={cellStyle}></div>
        );
    }
}

export default Cell;