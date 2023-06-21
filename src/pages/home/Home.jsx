import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import s from './Home.module.scss';
import AppHeader from '../../components/header/AppHeader';
import LogoutButton from '../../components/logoutButton/LogoutButton';
import LoginButton from '../../components/loginButton/LoginButton'; 
import RegisterButton from '../../components/registerButton/REgisterButton';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <section className={s.first}>
      <div className="container">
        <div className={s.first_content}>
          <h1 className={s.first_title}>Ecoboxes</h1>
          <p className={s.first_desc}>Сервис, который поможет очистить планету.</p>
        </div>
        {/* <LogoutButton />
        <LoginButton />
        <RegisterButton /> */}
      </div>
    </section>
  );
};

export default Home;
