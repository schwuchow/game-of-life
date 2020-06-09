import React from 'react';
import Cell from './Cell';
import './Cellboard.scss';

interface CellboardState {
    width: number,
    height: number,
    cells: CellType[][],
    prevCells: CellType[][]
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
            cells: [],
            prevCells: []
        }
    }

    componentDidMount() {
        this.initializeCellState();
    }

    initializeCellState() {
        let startCells: CellType[][] = [];
        for (let i = 0; i < this.state.width/10; i++) {
            startCells[i] = [];
            for (let j = 0; j < this.state.height/10; j++) {
                let cell: CellType = {
                    x: 25*i,
                    y: 25*j,
                    size: 25,
                    curState: Math.round(Math.random()),
                    prevState: 0
                };
                startCells[i][j] = cell;
            }
        }
        this.setState({ cells: startCells});
    }

    renderCells() {
        return this.state.cells.map((row, idx) => {
            let columns = row.map(({x, y, size, curState, prevState}, idx) => {
                return <Cell key={idx} x={x} y={y} size={size} curState={curState} prevState={prevState} />
            });
            return columns;
        })
    }

    render() {
        return(
            <div className="cellboard">
                {this.renderCells()}
            </div>
        );
    }
}

export default Cellboard;