import React, { useState } from 'react';
import './App.scss';
import Cellboard from './components/Cellboard';
import Settings from './components/Settings';
import { CellContext } from './components/CellContext';

interface AppState {
    width: number,
    height: number,
    cells: CellType[][],
    cellSize: number,
    shouldRun: boolean,
    density: number
}

interface CellType {
    x: number,
    y: number,
    size: number,
    curState: number
}

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        width: 800,
        height: 500,
        cells: [],
        cellSize: 25,
        shouldRun: false,
        density: 0.3
    });

    return (
        <div className="app">
            <h1>CONWAY'S GAME OF LIFE</h1>
            <CellContext.Provider value={{state, setState}}>
                <Cellboard />
                <Settings />
            </CellContext.Provider>
        </div>
    );
};

export default App;