import React, {useContext, useEffect} from 'react';
import Cell from './Cell';
import './Cellboard.scss';
import { CellContext } from './CellContext';

interface CellType {
    x: number,
    y: number,
    size: number,
    curState: number
}

const Cellboard: React.FC = () => {
    const {state, setState} = useContext(CellContext);

    useEffect(() => {
        initializeCellState();
    }, []);

    useEffect(() => {
        resize();
    }, [state.width, state.height]);

    useEffect(() => {
        changeDensity();
    }, [state.density]);

    useEffect(() => {
        // generate();
    });

    const resize = () => {
        initializeCellState();
    }

    const changeDensity = () => {
        initializeCellState();
    }

    const initializeCellState = () => {
        let rows = state.height / state.cellSize;
        let columns = state.width / state.cellSize;
        let startCells: CellType[][] = [];

        for (let i = 0; i < rows; i++) {
            startCells[i] = [];
            for (let j = 0; j < columns; j++) {
                // let random = Math.round(Math.random());
                let random = Math.random();
                if (random > state.density) random = 0
                else {random = 1}
                let cell: CellType = {
                    y: state.cellSize*i,
                    x: state.cellSize*j,
                    size: state.cellSize,
                    curState: random,
                };
                startCells[i][j] = cell;
            }
        }
        setState({ ...state, cells: startCells});
    }

    const renderCells = () => {
        return state.cells.map((row:CellType[]) => {
            let columns = row.map(({x, y, size, curState}, idx) => {
                return <Cell key={idx} x={x} y={y} size={size} curState={curState} />
            });
            return columns;
        })
    }

    const generate = () => {
        if (state.cells.length) {
            let rows = state.height/state.cellSize;
            let columns = state.width/state.cellSize;
            let newCells: CellType[][] = [...state.cells];
            let neighborCount = 0;
            // TODO change border cells
            for( let i = 1; i < rows-1; i++) {
                for (let j = 1; j < columns-1; j++) {
                    // console.log(this.state.cells[i][j]);
                    neighborCount = countNeighbors(i, j);

                    applyRulesOfLife(neighborCount, newCells, i, j);
                }
            }

            if (state.shouldRun) {
                setState({ cells: newCells });
                window.requestAnimationFrame(generate);
            }
        }
    }

    const countNeighbors = (curX: number, curY: number) => {
        let neighbors = 0;
        // console.log('Neighbour');
        for (let k = -1; k <= 1; k++) {
            for (let m = -1; m <= 1; m++) {
                if (!(k === 0 && m === 0)) {
                    // console.log(this.state.cells[curX+k][curY+m], k, m);
                    // console.log(curX+k,curY+m, k, m);
                    let {curState} = state.cells[curX+k][curY+m];
                    neighbors += curState;
                }
            }
        }
        return neighbors;
    }

    const applyRulesOfLife = (neighbors: number, newCells: CellType[][], curX: number, curY: number) => {
        let newCell = newCells[curX][curY];
        let cellState = state.cells[curX][curY].curState;

        if (cellState === 1 && neighbors >= 4) newCell.curState = 0; // Overpopulation (DEATH)
        else if (cellState === 1 && neighbors <= 1) newCell.curState = 0; // Lonliness (DEATH)
        else if (cellState === 0 && neighbors === 3) newCell.curState = 1; // BIRTH
        else {} // STASIS: stays alive / dead
    }

    return(
        <div className="cellboard">
            {renderCells()}
        </div>
    );
}

export default Cellboard;