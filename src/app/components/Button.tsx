import React from 'react';
import './Button.scss';

interface ButtonProps {
    action: string
}

const Button: React.FC<ButtonProps> = props => {

    const doSomething = () => {

    }

    return (
        <>
            <button className="button" onClick={doSomething} type="button">{props.action}</button>
        </>
    );
};

export default Button;