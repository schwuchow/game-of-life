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
    let frame: number;

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
        if (state.shouldRun) {
            generate();
        }
        return() => window.cancelAnimationFrame(frame);
    }, [state.shouldRun]);

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
                let random = calculateRandom(i, j, rows, columns);
                let cell: CellType = {
                    y: state.cellSize*i,
                    x: state.cellSize*j,
                    size: state.cellSize,
                    curState: random,
                };
                startCells[i][j] = cell;
            }
        }
        setState({ ...state, cells: startCells });
    }

    const calculateRandom = (i: number, j: number, rows: number, columns: number) => {
        return (
            Math.random() > state.density
            || !(i > rows/3 && i < rows*2/3)
            || !(j > columns/3 && j < columns*2/3)
            )? 0 : 1;
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

            setState({ ...state, cells: newCells });
            frame = window.requestAnimationFrame(generate);
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

    const renderCells = () => {
        return state.cells.map((row:CellType[]) => {
            let columns = row.map(({x, y, size, curState}, idx) => {
                return <Cell key={idx} x={x} y={y} size={size} curState={curState} />
            });
            return columns;
        })
    }

    return(
        <div className="cellboard">
            {renderCells()}
        </div>
    );
}

export default Cellboard;