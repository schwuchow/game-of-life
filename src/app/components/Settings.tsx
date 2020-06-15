import React from 'react';
import Slider from './Slider';
import Button from './Button';
import './Settings.scss';
import { CellContext } from './CellContext';

const Settings: React.FC = () => {
    const {state} = React.useContext(CellContext);

    return (
        <div className="settings">
            <Button action="START"/>
            <Button action="STOP"/>
            <Button action="RESET"/>
            <Slider label="WIDTH" min={200} max={850} step={state.cellSize} value={state.width}/>
            <Slider label="HEIGHT" min={200} max={500} step={state.cellSize} value={state.height}/>
            <Slider label="DENSITY" min={0.1} max={0.5} step={0.05} value={state.density}/>
        </div>
    );
};

export default Settings;