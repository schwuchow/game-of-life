import React from 'react';
import Cell from './Cell';
import './Cellboard.scss';

interface CellboardState {
    width: number,
    height: number,
    cells: CellType[][],
    cellSize: number
}

interface CellType {
    x: number,
    y: number,
    size: number,
    curState: number
}

class Cellboard extends React.Component<{}, CellboardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            width: 800,
            height: 500,
            cells: [],
            cellSize: 25
        }
    }

    componentDidMount() {
        this.initializeCellState();
    }

    initializeCellState() {
        let rows = this.state.height / this.state.cellSize;
        let columns = this.state.width / this.state.cellSize;
        let startCells: CellType[][] = [];

        for (let i = 0; i < rows; i++) {
            startCells[i] = [];
            for (let j = 0; j < columns; j++) {
                // let random = Math.round(Math.random());
                let random = Math.random();
                if (random > .1) random = 0
                else {random = 1}
                let cell: CellType = {
                    y: this.state.cellSize*i,
                    x: this.state.cellSize*j,
                    size: this.state.cellSize,
                    curState: random,
                };
                startCells[i][j] = cell;
            }
        }
        this.setState({ cells: startCells });
    }

    renderCells() {
        return this.state.cells.map(row => {
            let columns = row.map(({x, y, size, curState}, idx) => {
                return <Cell key={idx} x={x} y={y} size={size} curState={curState} />
            });
            return columns;
        })
    }

    generate = () => {
        let rows = this.state.height/this.state.cellSize;
        let columns = this.state.width/this.state.cellSize;
        let newCells: CellType[][] = [...this.state.cells];
        let neighborCount = 0;
        // TODO change border cells
        for( let i = 1; i < rows-1; i++) {
            for (let j = 1; j < columns-1; j++) {
                // console.log(this.state.cells[i][j]);
                neighborCount = this.countNeighbors(i, j);

                this.applyRulesOfLife(neighborCount, newCells, i, j);
            }
        }

        this.setState({ cells: newCells });

        window.requestAnimationFrame(this.generate);
    }

    countNeighbors(curX: number, curY: number) {
        let neighbors = 0;
        // console.log('Neighbour');
        for (let k = -1; k <= 1; k++) {
            for (let m = -1; m <= 1; m++) {
                if (!(k === 0 && m === 0)) {
                    // console.log(this.state.cells[curX+k][curY+m], k, m);
                    // console.log(curX+k,curY+m, k, m);
                    let {curState} = this.state.cells[curX+k][curY+m];
                    neighbors += curState;
                }
            }
        }
        return neighbors;
    }

    applyRulesOfLife(neighbors: number, newCells: CellType[][], curX: number, curY: number) {
        let newCell = newCells[curX][curY];
        let cellState = this.state.cells[curX][curY].curState;

        if (cellState === 1 && neighbors >= 4) newCell.curState = 0; // Overpopulation (DEATH)
        else if (cellState === 1 && neighbors <= 1) newCell.curState = 0; // Lonliness (DEATH)
        else if (cellState === 0 && neighbors === 3) newCell.curState = 1; // BIRTH
        else {} // STASIS: stays alive / dead
    }

    render() {
        return(
            <div className="cellboard" onClick={this.generate}>
                {this.renderCells()}
            </div>
        );
    }
}

export default Cellboard;