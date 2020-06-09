import React from 'react';
import Cell from './Cell';
import './Cellboard.scss';

interface CellboardState {
    width: number,
    height: number,
    cells: CellType[]
}

interface CellType {
    x: number,
    y: number,
    size: number,
    curState: number,
    prevState: number
}

class Cellboard extends React.Component<{}, CellboardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            width: 250,
            height: 250,
            cells: []
        }
    }

    componentDidMount() {
        this.initializeCellState();
    }

    initializeCellState() {
        let startCells = [];
        for (let i = 0; i < this.state.width; i+=25) {
            for (let j = 0; j < this.state.height; j+=25) {
                let cell: CellType = {
                    x: i,
                    y: j,
                    size: 25,
                    curState: 0,
                    prevState: 0
                };
                startCells.push(cell);
            }
        }
        this.setState({ cells: startCells});
    }

    renderCells() {
        return this.state.cells.map(({x, y, size, curState, prevState}, idx) => {
            return <Cell key={idx} x={x} y={y} size={size} curState={curState} prevState={prevState} />
        })
    }

    render() {
        return(
            <div className="cellboard">
                {/* <canvas width={this.state.width} height={this.state.height} style={{border: "1px solid #000000"}}>
                </canvas> */}
                {this.renderCells()}
            </div>
        );
    }
}

export default Cellboard;