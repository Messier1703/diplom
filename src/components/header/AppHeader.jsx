import React from 'react';
import s from './AppHeader.module.scss';
import LogoutButton from '../logoutButton/LogoutButton';

const AppHeader = () => {
    return (
        <div>
            <a href="/home" className={s.header_logo}>Home</a>
            <div>
                <a href="/login" className="header_link">Login</a>
                <a href="/register" className="header_link">Register</a>
            </div>
            <LogoutButton />
        </div>
    );
};

export default AppHeader;