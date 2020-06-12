import React, { useContext } from 'react';
import './Button.scss';
import { CellContext } from './CellContext';

interface ButtonProps {
    action: string
}

const Button: React.FC<ButtonProps> = props => {
    const {state, setState} = React.useContext(CellContext);

    const doSomething = () => {
        if (props.action === "START") {
            setState({...state, shouldRun: true});
        } else if (props.action === "STOP") {
            setState({...state, shouldRun: false});
        }
    }

    return (
        <>
            <button className="button" onClick={doSomething} type="button">{props.action}</button>
        </>
    );
};

export default Button;