import React from 'react';
import Slider from './Slider';
import Button from './Button';
import './Settings.scss';
import { CellContext } from './CellContext';

const Settings: React.FC = () => {
    const {state, setState} = React.useContext(CellContext);

    return (
        <div className="settings">
            <Button action="START"/>
            <Button action="STOP"/>
            <Button action="RESET"/>
            <Slider label="WIDTH" min={300} max={1000} step={state.cellSize} value={state.width}/>
            <Slider label="HEIGHT" min={300} max={1000} step={state.cellSize} value={state.height}/>
            <Slider label="DENSITY" min={0} max={1} step={0.1} value={state.density}/>
        </div>
    );
};

export default Settings;