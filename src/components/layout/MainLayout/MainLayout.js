import React from "react";
import './MainLayout.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from 'react-router-dom';

const MainLayout = ({children})=> {
    return(
        <div className="MainLayout">
            <Header />
            <div className="MainLayout--outlet__container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;