import React from "react";
import './Header.css';
import headerImage from '../../../assets/img/favicon-dark.png';

const Header = ()=> {
    return(
        <header className="Header">
            <div className="Header--container">
                <h1 className="Header__title">رایکا</h1>
                <img className="Header__image" src={headerImage} alt="HeaderImage" />
            </div>
        </header>
    );
};

export default Header;