import React, { useContext } from 'react';
import './Button.scss';
import { CellContext } from './CellContext';

interface ButtonProps {
    action: string
}

const Button: React.FC<ButtonProps> = props => {
    const {state, setState} = React.useContext(CellContext);

    const handleStateOnClick = () => {
        if (props.action === "START") {
            setState({...state, shouldRun: true});
        } else if (props.action === "STOP") {
            setState({...state, shouldRun: false});
        } else if (props.action === "RESET") {
            setState({...state, width: 800, height: 500, density: .3, shouldRun: false, reset: state.reset+1});
        }
    }

    return (
        <>
            <button className="button" onClick={handleStateOnClick} type="button">{props.action}</button>
        </>
    );
};

export default Button;