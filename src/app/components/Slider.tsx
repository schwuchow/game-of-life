import React from 'react';
import './Slider.scss';

interface SliderProps {
    label: string
}

const Slider: React.FC<SliderProps> = props => {

    const doSomething = () => {

    }

    return (
        <div>
            <label>{props.label}</label>
            <input className="slider" onChange={doSomething} type="range" min="100" max="1000" value="500"></input>
        </div>
    );
};

export default Slider;