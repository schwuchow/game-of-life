import React from 'react';
import Slider from './Slider';
import Button from './Button';
import './Settings.scss';

const Settings: React.FC = () => {
    return (
        <div className="settings">
            <Button action="START"/>
            <Button action="STOP"/>
            <Button action="RESET"/>
            <Slider label="WIDTH"/>
            <Slider label="HEIGHT"/>
            <Slider label="RANDOMNESS"/>
        </div>
    );
};

export default Settings;