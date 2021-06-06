import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return <header className={s.header}>
        <img src='https://icon-library.com/images/train-icon/train-icon-0.jpg' />

        <div className={s.loginBlock}>
            <NavLink to={'/login'}>Login</NavLink>
        </div>
    </header>
}

export default Header;