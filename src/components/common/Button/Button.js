import React from "react";
import './Button.css';

const Button = ({children, handleClick, disabled, className})=> {
    return(
        <button 
        onClick={handleClick} 
        className={`Button ${className}`}
        disabled = {disabled}
        >
            {children}
        </button>
    )
}

export default Button;