import React from 'react';
import './Slider.scss';
import { CellContext } from './CellContext';

interface SliderProps {
    label: string,
    value: number,
    min: number,
    max: number,
    step: number
}

const Slider: React.FC<SliderProps> = props => {
    const {state, setState} = React.useContext(CellContext);

    const doSomething = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.label === "WIDTH") {
            setState({ ...state, width: e.target.value});
        } else if (props.label === "HEIGHT") {
            setState({ ...state, height: e.target.value});
        } else if (props.label === "DENSITY") {
            setState({ ...state, density: e.target.value});
        }
    }

    return (
        <div className="slider-container">
            <label>{props.label}</label>
            <input className="slider"
                   onChange={doSomething}
                   type="range"
                   min={props.min}
                   max={props.max}
                   step={props.step}
                   value={props.value}>
            </input>
            <span>{props.value}</span>
        </div>
    );
};

export default Slider;