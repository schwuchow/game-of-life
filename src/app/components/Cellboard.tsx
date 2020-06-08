import React from 'react';
import Cell from './Cell';

interface CellboardProps {

}

interface CellboardState {
    width: number,
    height: number,
    cells: Array<Cell>
}

class Cellboard extends React.Component<CellboardProps, CellboardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            width: 400,
            height: 400,
            cells: []
        }
    }

    printCells() {
        return <Cell />
    }

    render() {
        return(
            <div>
                <canvas width={this.state.width} height={this.state.height} style={{border: "1px solid #000000"}}>
                </canvas>
                {this.printCells()}
            </div>
        );
    }
}

export default Cellboard;