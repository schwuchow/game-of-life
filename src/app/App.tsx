import React from 'react';
import './App.scss';
import Cellboard from './components/Cellboard';
import Settings from './components/Settings';

const App: React.FC = () => {
    return (
        <div>
            <Cellboard />
            {/* <Settings /> */}
        </div>
    );
};

export default App;