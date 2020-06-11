import React from 'react';
import './App.scss';
import Cellboard from './components/Cellboard';
import Settings from './components/Settings';

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>CONWAY'S GAME OF LIFE</h1>
            <Cellboard />
            <Settings />
        </div>
    );
};

export default App;